// Prerender configuration for Prerender.io service
// Token: 0RLFZu5pp3Ri2LbLEfpn

export const prereenderConfig = {
  token: process.env.PRERENDER_TOKEN || '0RLFZu5pp3Ri2LbLEfpn',
  baseUrl: process.env.PRERENDER_BASE_URL || 'https://ipsacademyindore.edu.in',
  
  // Routes to pre-render
  routes: [
    // Home & Main Pages
    { url: '/ipsa/', name: 'Home' },
    { url: '/ipsa/about', name: 'About' },
    { url: '/ipsa/placements', name: 'Placements' },
    { url: '/ipsa/facilities', name: 'Facilities' },
    { url: '/ipsa/contact', name: 'Contact' },
    
    // Activities
    { url: '/ipsa/activities', name: 'Activities' },
    { url: '/ipsa/activities/cultural', name: 'Cultural Activities' },
    { url: '/ipsa/activities/events', name: 'Events' },
    { url: '/ipsa/activities/workshop', name: 'Workshops' },
    { url: '/ipsa/activities/clubs', name: 'Clubs' },
    { url: '/ipsa/activities/social', name: 'Social Activities' },
    { url: '/ipsa/activities/alumni', name: 'Alumni' },
    { url: '/ipsa/activities/news', name: 'News' },
    
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
