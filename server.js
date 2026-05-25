import fs from 'fs'
import path from 'path'
import express from 'express'
import compression from 'compression'
import { fileURLToPath, pathToFileURL } from 'url'
import fetch from 'node-fetch'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Create environment variable for whether this is production
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

// Helper to pre-fetch page data on the server
async function prefetchPageState(urlPath) {
  // Normalize path (remove trailing slashes, query params, etc.)
  const cleanPath = urlPath.split('?')[0].replace(/\/+$/, '') || '/';

  // Only prefetch for IPSA Main Page (home page / or /ipsa/home)
  if (cleanPath === '/' || cleanPath === '/ipsa/home' || cleanPath === '/ipsa') {
    const collegeSlug = 'ipsa';
    const pageName = 'home';
    const serverBase = 'https://portal.ipsacademyindore.edu.in/api';

    try {
      console.log(`\n[SSR Fetch] Pre-fetching database data for ${collegeSlug}/${pageName} on server...`);

      // Fetch page data and courses in parallel
      const [pageRes, coursesRes] = await Promise.all([
        fetch(`${serverBase}/${collegeSlug}/pages/${pageName}`, { headers: { 'accept': 'application/json' } }),
        fetch(`${serverBase}/${collegeSlug}/courses`, { headers: { 'accept': 'application/json' } })
      ]);

      if (!pageRes.ok || !coursesRes.ok) {
        throw new Error(`Failed to fetch: Page Status ${pageRes.status}, Courses Status ${coursesRes.status}`);
      }

      const pageData = await pageRes.json();
      const courses = await coursesRes.json();

      console.log('[SSR Fetch] Data fetched successfully from portal API!');

      return {
        collegeSlug,
        pageName,
        pageData,
        courses
      };
    } catch (err) {
      console.error('[SSR Fetch Error] Failed to prefetch home page data:', err.message);
      return null;
    }
  }

  return null;
}

// Helper to inject SEO meta tags, canonical, OpenGraph, and JSON-LD schema into index.html
function injectSEOMetadata(template, pageData) {
  if (!pageData) return template;

  const title = pageData.meta_title || "IPS Academy Indore | Admissions, Programs, Campus Life";
  const desc = pageData.meta_description || "IPS Academy Indore offers career-focused programs, experienced faculty, and a vibrant campus. Explore admissions, courses, and campus life.";
  const keywords = pageData.meta_keywords || "";
  const canonical = pageData.canonical_url || "https://ipsacademyindore.edu.in/ipsa/home";
  const ogImage = pageData.og_image || "https://res.cloudinary.com/didgvvg7n/image/upload/v1777276879/college_logos/smqartzltotnp9shalrn.png";

  let headContent = `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="keywords" content="${keywords}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${pageData.og_title || title}" />
    <meta property="og:description" content="${pageData.og_description || desc}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:title" content="${pageData.twitter_title || title}" />
    <meta name="twitter:description" content="${pageData.twitter_description || desc}" />
    <meta name="twitter:image" content="${pageData.twitter_image || ogImage}" />
  `;

  if (pageData.schema_markup) {
    try {
      const schema = typeof pageData.schema_markup === 'string'
        ? pageData.schema_markup
        : JSON.stringify(pageData.schema_markup);
      headContent += `\n    <script type="application/ld+json">${schema}</script>`;
    } catch (e) {
      console.error('Schema JSON parse error:', e);
    }
  }

  // Strip standard SEO tags from index.html to avoid duplicates
  let strippedTemplate = template
    .replace(/<title>.*?<\/title>/gi, '')
    .replace(/<meta name="description".*?\/>/gi, '')
    .replace(/<link rel="canonical".*?\/>/gi, '')
    .replace(/<meta property="og:title".*?\/>/gi, '')
    .replace(/<meta property="og:description".*?\/>/gi, '')
    .replace(/<meta property="og:image".*?\/>/gi, '')
    .replace(/<meta property="og:url".*?\/>/gi, '')
    .replace(/<meta name="twitter:title".*?\/>/gi, '')
    .replace(/<meta name="twitter:description".*?\/>/gi, '')
    .replace(/<meta name="twitter:image".*?\/>/gi, '');

  return strippedTemplate.replace('<head>', `<head>${headContent}`);
}

const app = express()

app.use(compression())

let vite

// Serve static assets
if (!isProduction) {
  // Development mode with Vite dev server
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
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

    // Pre-fetch state on server if applicable (specifically for Home page first)
    const prefetchData = await prefetchPageState(req.url)

    // Render the app HTML with the current URL and pre-fetched data
    let appHtml = ''
    try {
      // Pass the requested URL and prefetchData to the render function
      appHtml = render(req.url, {}, prefetchData)
    } catch (renderError) {
      console.error('Render error:', renderError)
      // Still send page with error boundary
      appHtml = '<div id="error-container"></div>'
    }

    // Restore console.warn
    console.warn = originalWarn

    // Inject pre-fetched state script if available
    let stateScript = ''
    if (prefetchData) {
      stateScript = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(prefetchData).replace(/</g, '\\u003c')};</script>\n`
    }

    // Inject app HTML and prefetch state into template
    let html = template.replace(
      '<div id="root"></div>',
      `${stateScript}<div id="root">${appHtml}</div>`
    )

    // Dynamically inject dynamic SEO tags into head if prefetch data has page metadata
    if (prefetchData && prefetchData.pageData) {
      html = injectSEOMetadata(html, prefetchData.pageData)
    }

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
