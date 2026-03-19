# Pre-rendering Setup - Production Guide

## Current Status
✅ **Token Verified**: Your Prerender.io token is active and valid  
✅ **Scripts Ready**: Pre-render CLI tools configured  
✅ **Build Ready**: Application builds successfully  

## How Pre-rendering Works with Your Token

Your Prerender token (`0RLFZu5pp3Ri2LbLEfpn`) allows you to:
- **Cache routes** on Prerender.io servers
- **Generate static HTML** for better SEO
- **Improve page speed** for users
- **Serve search engines** fully-rendered pages

## Production Deployment Steps

### 1. Deploy Your Application
First, deploy your built application to a production server:
```bash
# Build for production
npm run build

# Deploy dist/ folder to your hosting
# Example: Vercel, Netlify, AWS, etc.
```

### 2. Update Environment Variables
Set your production URL in `.env`:
```env
PRERENDER_TOKEN=0RLFZu5pp3Ri2LbLEfpn
PRERENDER_BASE_URL=https://www.ipsacademy.edu.in   # Your production domain
```

### 3. Trigger Pre-rendering

**⚠️ IMPORTANT:** Prerender.io needs to reach your site from the internet. If you're testing locally, use ngrok first:

**For Local Testing:**
```bash
# Terminal 1: Start your server
npm start

# Terminal 2: Expose locally with ngrok
npm install -g ngrok
ngrok http 3000

# Terminal 3: Run prerender with public URL
PRERENDER_BASE_URL=https://your-ngrok-url.ngrok.io npm run prerender
```

**For Production:**
Once your site is live on your domain, run:
```bash
PRERENDER_BASE_URL=https://www.ipsacademy.edu.in npm run prerender
```

This will submit all routes to Prerender.io for caching.

## Available Routes for Pre-rendering

Currently configured for pre-rendering:
- `/` - Home page
- `/about` - About IPS Academy
- `/facilities` - Facilities
- `/placement` - Placement
- `/contact` - Contact  
- `/activities` - Activities
- `/student-life` - Student Life
- `/news` - News
- `/alumni` - Alumni
- `/sitemap.xml` - XML Sitemap
- `/robots.txt` - Robots file

## Adding More Routes

To pre-render additional routes (like dynamic pages):

1. Edit `prerender.config.js`:
```javascript
routes: [
  { url: '/', name: 'Home' },
  { url: '/about', name: 'About' },
  { url: '/college/engineering', name: 'Engineering Program' },  // Add new
  // ...
]
```

2. Run pre-render:
```bash
npm run prerender
```

## CLI Commands Reference

```bash
# Verify token connectivity
npm run prerender:verify

# Pre-render all configured routes
npm run prerender

# Build and pre-render (one command)
npm run prerender:build

# Pre-render specific routes
npm run prerender:custom /about /contact /facilities
```

## Monitoring & Status

### Check Pre-rendering Status
1. Go to Prerender.io Dashboard: https://app.prerender.io
2. Log in with your account
3. View cached URLs and crawl status
4. Monitor rate limits and usage

### View Cache
Visit your production URL + `?_escaped_fragment_=` to see the pre-rendered version:
```
https://www.ipsacademy.edu.in/?_escaped_fragment_=
https://www.ipsacademy.edu.in/about?_escaped_fragment_=
```

## Cache Settings

Current configuration:
- **Cache TTL**: 7 days
- **Follow Links**: Enabled (crawls internal links)
- **Timeout**: 30 seconds per page
- **Rate Limit**: Per your Prerender plan

## SEO Benefits

✅ **Search Engines**: Get fully rendered HTML with all content  
✅ **Social Media**: Proper meta tags for link previews  
✅ **Performance**: Static pages load faster  
✅ **Crawlability**: Complex JavaScript rendered server-side  

## Troubleshooting

### Pre-rendering fails for production URL
```bash
# Verify the URL is accessible
curl https://www.ipsacademy.edu.in

# Check token validity
npm run prerender:verify
```

### Routes not caching
- Ensure site returns HTTP 200 status
- Check that pages have proper title/meta tags
- Verify URL structure in prerender.config.js

### Rate limiting
- Your plan has specific rate limits
- Check Prerender.io dashboard
- Increase delays between requests if needed

## Advanced Configuration

### Cache Invalidation
To force refresh a cached route:
```bash
npm run prerender:custom /about
```

### Scheduled Pre-rendering
Add to your CI/CD pipeline (GitHub Actions, GitLab CI, etc.):
```yaml
- run: npm run prerender:build
```

## Files

- `prerender.config.js` - Route configuration
- `scripts/prerender.js` - CLI tool
- `.env` - Token and settings (DO NOT COMMIT)
- `.env.example` - Template for .env
- `PRERENDER_SETUP.md` - This file

## Support

- **Prerender.io Docs**: https://prerender.io/documentation
- **Dashboard**: https://app.prerender.io
- **Email**: support@prerender.io

---

**Token**: 0RLFZu5pp3Ri2LbLEfpn  
**Last Updated**: March 13, 2026
