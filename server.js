import fs from 'fs'
import path from 'path'
import express from 'express'
import compression from 'compression'
import { fileURLToPath, pathToFileURL } from 'url'
import prerenderNode from 'prerender-node'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Create environment variable for whether this is production
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

const app = express()

// Add Prerender middleware for SEO - detects bots and serves pre-rendered HTML
app.use(prerenderNode.set('prerenderToken', '0RLFZu5pp3Ri2LbLEfpn'))

app.use(compression())

let vite

// Serve static assets
if (!isProduction) {
  // Development mode with Vite dev server
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
  })
  app.use(vite.middlewares)
} else {
  // Production mode - serve static assets
  const clientDir = path.join(__dirname, 'dist/client')
  
  // Serve assets with long cache
  app.use(
    '/assets',
    express.static(path.join(clientDir, 'assets'), {
      maxAge: '1y',
    })
  )
  
  // Serve public files (sitemap, robots.txt, etc.)
  app.use(express.static(path.join(__dirname, 'public')))
  
  // Catch-all for missing static files to prevent React Router from catching them
  app.use((req, res, next) => {
    // If the request is for a static file extension, send 404 instead of routing to React
    const staticExtensions = ['.js', '.css', '.woff', '.woff2', '.ttf', '.eot', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico']
    if (staticExtensions.some(ext => req.url.includes(ext))) {
      return res.status(404).send('Not Found')
    }
    next()
  })
}

// HTML template
const getTemplate = () => {
  const templatePath = isProduction
    ? path.join(__dirname, 'dist/client/index.html')
    : path.join(__dirname, 'index.html')
  return fs.readFileSync(templatePath, 'utf-8')
}

async function handleSPA(req, res) {
  // Suppress React Router warnings about unmatched asset paths
  const originalWarn = console.warn
  console.warn = (...args) => {
    // Suppress "No routes matched location" warnings for asset files
    if (args[0]?.includes?.('No routes matched location')) {
      return
    }
    originalWarn(...args)
  }

  try {
    const template = getTemplate()
    let render

    if (!isProduction) {
      // Load and transform the entry server module in dev mode
      const { render: renderFn } = await vite.ssrLoadModule('/src/entry-server.jsx')
      render = renderFn
    } else {
      // Load the pre-built server module in production
      try {
        const serverModulePath = pathToFileURL(path.join(__dirname, 'dist/server/entry-server.js')).href
        const serverModule = await import(serverModulePath)
        render = serverModule.render
      } catch (e) {
        console.error('Failed to load server render module:', e.message)
        return res.status(500).send('Server rendering failed. Did you run npm run build?')
      }
    }

    // Render the app HTML with the current URL
    let appHtml = ''
    try {
      // Pass the requested URL to the render function
      appHtml = render(req.url)
    } catch (renderError) {
      console.error('Render error:', renderError)
      // Still send page with error boundary
      appHtml = '<div id="error-container"></div>'
    }

    // Restore console.warn
    console.warn = originalWarn

    // Inject app HTML into template
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    // Restore console.warn in case of error
    console.warn = originalWarn
    
    // Handle errors
    if (!isProduction && vite) {
      vite.ssrFixStacktrace(e)
    }
    console.error('Error during rendering:', e.stack)
    res.status(500).end(`<h1>Error during rendering</h1><pre>${e.message}</pre>`)
  }
}

// Serve SPA - all routes go to handleSPA
app.use(handleSPA)

app.listen(PORT, () => {
  console.log(`\n✅ Server is running on http://localhost:${PORT}`)
  if (!isProduction) {
    console.log('📝 Development mode with Vite HMR enabled')
  } else {
    console.log('🚀 Production SSR server running')
  }
})
