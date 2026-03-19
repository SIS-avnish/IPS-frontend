#!/usr/bin/env node
/**
 * Test if routes are returning 200 status
 */
import fetch from 'node-fetch';

const baseUrl = 'https://ipsacademyindore.edu.in';
const testRoutes = [
  '/ipsa/',
  '/ipsa/about',
  '/ipsa/placements',
  '/ipsa/facilities',
];

console.log('🧪 Testing route status codes...\n');

for (const route of testRoutes) {
  try {
    const url = `${baseUrl}${route}`;
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Prerender Test)',
      },
    });
    
    console.log(`${response.status === 200 ? '✅' : '❌'} ${route} - Status: ${response.status}`);
    
    if (response.status !== 200) {
      const text = await response.text();
      console.log(`   Response length: ${text.length} bytes`);
    }
  } catch (error) {
    console.log(`❌ ${route} - Error: ${error.message}`);
  }
}
