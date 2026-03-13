import PrerenderSPAPlugin from 'prerender-spa-plugin';
import path from 'path';

const routes = [
  '/',
  '/about',
  '/facilities',
  '/placement',
  '/contact',
  '/student-life',
  // Add more routes as needed
];

export const prerenderConfig = {
  plugins: [
    new PrerenderSPAPlugin({
      staticDir: path.join(process.cwd(), 'dist/client'),
      routes: routes,
      renderer: new (await import('prerender-spa-plugin/lib/renderers/PuppeteerRenderer')).default({
        headless: true,
        args: ['--no-sandbox']
      }),
      postProcess: (renderedRoute) => {
        // Modify the route if necessary
        return renderedRoute;
      }
    })
  ]
};

export default routes;
