# Pre-rendering Setup Guide

## Overview
Your IPS Academy frontend now supports pre-rendering through **Prerender.io**, which generates static HTML snapshots of your pages for better SEO and performance.

## Configuration

### Token
- **Token**: `0RLFZu5pp3Ri2LbLEfpn`
- **Location**: Stored in `.env` as `PRERENDER_TOKEN`
- **Status**: ✅ Verified and active

### Environment Variables
```env
PRERENDER_TOKEN=0RLFZu5pp3Ri2LbLEfpn
PRERENDER_BASE_URL=http://localhost:3000
```

## Available Commands

### ⚠️ Required: Accessible URL
**Prerender.io needs to reach your site from the internet.** You cannot use `http://localhost:3000`.

For local development, use **ngrok**:
```bash
# Terminal 1: Start server
npm start

# Terminal 2: Expose with ngrok
ngrok http 3000

# Terminal 3: Use the public URL
PRERENDER_BASE_URL=https://your-ngrok-url.ngrok.io npm run prerender
```

For production, set your actual domain:
```bash
PRERENDER_BASE_URL=https://www.ipsacademy.edu.in npm run prerender
```

### Available Commands

### 1. Verify Token
```bash
npm run prerender:verify
```
Checks if your Prerender token is valid and can connect to the service.

### 2. Pre-render All Routes
```bash
npm run prerender
```
Triggers pre-rendering of all routes defined in `prerender.config.js`.

### 3. Build & Pre-render
```bash
npm run prerender:build
```
Builds your application and then pre-renders all routes in one command.

### 4. Custom Routes
```bash
npm run prerender:custom /route1 /route2 /route3
```
Pre-render specific routes only.

## Pre-rendered Routes

The following routes are configured for pre-rendering:

### Main Pages
- `/` - Home
- `/about` - About
- `/facilities` - Facilities
- `/placement` - Placement
- `/contact` - Contact

### Content Pages
- `/activities` - Activities
- `/student-life` - Student Life
- `/news` - News
- `/alumni` - Alumni

### SEO
- `/sitemap.xml` - Sitemap
- `/robots.txt` - Robots

## Adding New Routes

To add more routes for pre-rendering:

1. Edit `prerender.config.js`
2. Add route to the `routes` array:
   ```javascript
   routes: [
     { url: '/new-route', name: 'New Route' },
     // ...
   ]
   ```
3. Run `npm run prerender` to trigger pre-rendering

## How It Works

1. **Build Phase**: Your application is built with Vite SSR
2. **Pre-render Phase**: Prerender.io crawls each route and caches static HTML
3. **Serve Phase**: Users get fast static HTML instead of waiting for SSR rendering

## Performance Benefits

- **SEO**: Search engines get fully rendered HTML
- **Speed**: Static pages serve faster than SSR
- **Cache**: Pages cached for 7 days (configurable)
- **Social**: Meta tags properly rendered for social media previews

## Troubleshooting

### Token verification fails
```bash
npm run prerender:verify
```
Check the error message and verify token is correct in `.env`

### Routes not pre-rendering
1. Ensure your server is running on `http://localhost:3000`
2. Check that routes are accessible and return 200 status
3. Review route configuration in `prerender.config.js`

### Rate limiting
- Prerender.io has rate limits based on your plan
- Add delays between prerender calls if needed
- Check Prerender.io account for usage stats

## Production Deployment

For production:

1. Update `PRERENDER_BASE_URL` to your production domain
2. Run `npm run prerender:build` before deployment
3. Deploy the `dist/` folder
4. Monitor pre-rendering status in Prerender.io dashboard

## Files

- `prerender.config.js` - Main configuration file
- `scripts/prerender.js` - Pre-rendering CLI utility
- `package.json` - Pre-render npm scripts
- `.env` - Environment variables with token

## Support

For Prerender.io support:
- Visit: https://prerender.io
- Dashboard: https://app.prerender.io
- API Docs: https://prerender.io/documentation

---

**Last Updated**: March 13, 2026
