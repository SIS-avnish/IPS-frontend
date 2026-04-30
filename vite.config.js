import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const isSSR = !!process.env.SSR

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    ...(isSSR && { ssr: "src/entry-server.jsx" }),
    ssrManifest: !isSSR,
    outDir: isSSR ? "dist/server" : "dist/client",
    rollupOptions: {
      ...(isSSR && {
        external: ["react", "react-dom"],
      }),
      output: {
        ...(isSSR ? {} : {
          manualChunks: {
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            "vendor-motion": ["framer-motion"],
            "vendor-icons": ["@fortawesome/react-fontawesome", "@fortawesome/free-solid-svg-icons", "@fortawesome/fontawesome-svg-core"],
            "vendor-ui": ["lucide-react", "class-variance-authority", "clsx", "tailwind-merge"],
          },
        }),
      },
    },
  },
});
