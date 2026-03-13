// Prerender configuration for Prerender.io service
// Token: 0RLFZu5pp3Ri2LbLEfpn

export const prereenderConfig = {
  token: process.env.PRERENDER_TOKEN || '0RLFZu5pp3Ri2LbLEfpn',
  baseUrl: process.env.PRERENDER_BASE_URL || 'http://localhost:3000',
  
  // Routes to pre-render
  routes: [
    // Home & Main Pages
    { url: '/', name: 'Home' },
    { url: '/about', name: 'About' },
    { url: '/facilities', name: 'Facilities' },
    { url: '/placement', name: 'Placement' },
    { url: '/contact', name: 'Contact' },
    
    // Activities & Events
    { url: '/activities', name: 'Activities' },
    { url: '/student-life', name: 'Student Life' },
    { url: '/news', name: 'News' },
    { url: '/alumni', name: 'Alumni' },
    
    // Sitemap for SEO
    { url: '/sitemap.xml', name: 'Sitemap' },
    { url: '/robots.txt', name: 'Robots' },
  ],

  // Prerender.io service configuration
  service: {
    name: 'prerender.io',
    url: 'https://api.prerender.io',
    endpoint: '/recache',
  },

  // Cache settings
  cache: {
    enabled: true,
    ttl: 86400 * 7, // 7 days
  },

  // Crawl settings
  crawl: {
    followLinks: true,
    timeout: 30000,
    waitFor: '.content-loaded', // CSS selector to wait for
  }
};

export default prereenderConfig;
