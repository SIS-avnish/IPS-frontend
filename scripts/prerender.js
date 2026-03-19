import fetch from 'node-fetch';
import prerenderConfig from '../prerender.config.js';
import { URL, URLSearchParams } from 'url';

// Hardcode token to ensure it's not empty
const PRERENDER_TOKEN = '0RLFZu5pp3Ri2LbLEfpn';
// Use the correct Prerender.io recache endpoint with query params
const PRERENDER_API_BASE = 'https://api.prerender.io/recache';

/**
 * Submit routes to Prerender.io for pre-rendering
 */
async function triggerPrerender(routes = []) {
  const routesToRender = routes.length > 0 ? routes : prerenderConfig.routes;
  
  console.log(`\n🔄 Starting pre-rendering of ${routesToRender.length} routes...`);
  console.log(`📍 Base URL: ${prerenderConfig.baseUrl}\n`);

  // Check if base URL is localhost
  if (prerenderConfig.baseUrl.includes('localhost') || prerenderConfig.baseUrl.includes('127.0.0.1')) {
    console.warn('\n⚠️  WARNING: Using localhost URL!\n');
    console.warn('Prerender.io cannot reach localhost. You need:');
    console.warn('  1. A public URL (production deployment)');
    console.warn('  2. OR use ngrok: ngrok http 3000');
    console.warn('  3. Then set: PRERENDER_BASE_URL=https://your-ngrok-url.ngrok.io\n');
  }

  let successCount = 0;
  let failureCount = 0;
  const errors = [];

  for (const route of routesToRender) {
    try {
      const url = typeof route === 'string' ? route : route.url;
      const fullUrl = new URL(url, prerenderConfig.baseUrl).href;
      
      console.log(`  ⏳ Pre-rendering: ${url}`);

      // Build the query parameters
      const params = new URLSearchParams({
        token: PRERENDER_TOKEN,
        url: fullUrl,
      });

      const requestUrl = `${PRERENDER_API_BASE}?${params.toString()}`;
      
      // Debug: Show what we're sending (without token)
      console.log(`     📤 Submitting: ${fullUrl}`);
      console.log(`     🔑 Token set: ${PRERENDER_TOKEN ? 'YES' : 'NO'}`);
      console.log(`     📝 Request params: token=${PRERENDER_TOKEN.substring(0, 5)}... url=${fullUrl}`);

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Prerender-Token': PRERENDER_TOKEN,
        },
      });

      if (response.ok) {
        console.log(`  ✅ Success: ${url}`);
        successCount++;
      } else {
        let errorMsg = `Failed with status ${response.status}`;
        let responseBody = '';
        
        try {
          responseBody = await response.text();
        } catch (e) {
          // Response body not readable
        }
        
        // More helpful error messages
        if (response.status === 400) {
          errorMsg += ' (Bad Request)';
          if (responseBody) {
            errorMsg += ` - ${responseBody}`;
          }
        } else if (response.status === 401) {
          errorMsg += ' (Unauthorized - invalid token)';
        } else if (response.status === 403) {
          errorMsg += ' (Forbidden - plan limit reached)';
        }
        
        console.log(`  ❌ Failed: ${url} - ${errorMsg}`);
        errors.push({ url, error: errorMsg });
        failureCount++;
      }
    } catch (error) {
      const errorMsg = error.message;
      console.log(`  ❌ Error: ${typeof route === 'string' ? route : route.url} - ${errorMsg}`);
      errors.push({ url: typeof route === 'string' ? route : route.url, error: errorMsg });
      failureCount++;
    }

    // Add delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 Pre-rendering Summary:`);
  console.log(`  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failureCount}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Errors:\n`);
    errors.forEach(err => {
      console.log(`  - ${err.url}: ${err.error}`);
    });
  }

  return { success: successCount, failed: failureCount, errors };
}

/**
 * Verify Prerender token is valid
 */
async function verifyToken() {
  console.log('🔐 Verifying Prerender token...\n');

  try {
    const params = new URLSearchParams({
      token: PRERENDER_TOKEN,
      url: 'https://example.com',
    });

    const requestUrl = `${PRERENDER_API_BASE}?${params.toString()}`;

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'X-Prerender-Token': PRERENDER_TOKEN,
      },
    });

    if (response.ok || response.status === 400) {
      console.log('✅ Token is valid!\n');
      return true;
    } else if (response.status === 401) {
      console.error('❌ Invalid token: Unauthorized\n');
      return false;
    } else {
      console.error(`❌ Token verification failed: ${response.status}\n`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Connection error: ${error.message}\n`);
    return false;
  }
}

// CLI execution
if (process.argv[2]) {
  const command = process.argv[2];

  if (command === 'verify') {
    verifyToken();
  } else if (command === 'render') {
    triggerPrerender();
  } else if (command === 'render-custom') {
    const customRoutes = process.argv.slice(3);
    triggerPrerender(customRoutes);
  }
} else {
  triggerPrerender();
}

export { triggerPrerender, verifyToken };
