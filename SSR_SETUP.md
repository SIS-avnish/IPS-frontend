# Server-Side Rendering (SSR) Setup Guide

Your project has been configured for Server-Side Rendering. Here's how to use it:

## Development Mode

To run the development server with SSR support:

```bash
npm run dev:ssr
```

This will start an Express server with Vite dev middleware on `http://localhost:3000`. Changes to your files will be hot-reloaded.

## Production Build

To create a production SSR build:

```bash
npm run build
```

This command:
1. Builds the client bundle in `dist/client/`
2. Builds the server bundle in `dist/server/`

## Production Server

After building, start the production server:

```bash
npm start
```

Or with custom port:

```bash
PORT=3000 npm start
```

## Project Structure

### New Files Created:
- `server.js` - Express server for SSR
- `src/entry-server.jsx` - Server-side entry point (renders app to string)
- `src/entry-client.jsx` - Client-side entry point (hydrates the app)
- `build.mjs` - Build script helper

### Updated Files:
- `index.html` - Updated to reference `entry-client.jsx`
- `vite.config.js` - Configured for SSR builds
- `package.json` - Added SSR scripts

## How It Works

1. **Development**: 
   - Express server runs with Vite middleware
   - Requests are rendered server-side
   - Client hydrates on navigation

2. **Production**:
   - Client bundle: Pre-built static assets
   - Server bundle: Pre-rendered on each request
   - Both bundles optimized for performance

## Available Scripts

- `npm run dev` - Standard Vite dev server (CSR)
- `npm run dev:ssr` - Express + Vite dev server (SSR)
- `npm run build` - Build both client and server bundles
- `npm run build:client` - Build client only
- `npm run build:server` - Build server only
- `npm run start` - Run production SSR server
- `npm run preview` - Preview production build locally

## Environment Variables

- `NODE_ENV=production` - Run in production mode
- `PORT=3000` - Server port (default: 3000)

## Important Notes

⚠️ **Router Setup**: Your app uses `BrowserRouter`. For full SSR with routing:
  - Consider using `StaticRouter` on server-side
  - Or use conditional rendering based on `typeof window`

⚠️ **Lazy Components**: Lazy-loaded components work but may not be fully SSR'd in initial HTML (they will hydrate on client)

## Troubleshooting

### Build fails
- Ensure all imports are correct
- Check for browser-only APIs (use `typeof window` guards)

### SSR server won't start
- Make sure you ran `npm run build` first
- Check that `dist/server/entry-server.js` exists
- Try with `NODE_ENV=production`

### Styles not loading
- Vite handles CSS in SSR automatically
- Check that Tailwind is properly configured in `vite.config.js`

## Next Steps

1. Test development SSR: `npm run dev:ssr`
2. Build for production: `npm run build`
3. Start production server: `npm start`
4. Optimize routing with StaticRouter if needed
5. Add custom SSR-specific logic as needed
