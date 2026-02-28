import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["@fortawesome/react-fontawesome", "@fortawesome/free-solid-svg-icons", "@fortawesome/fontawesome-svg-core"],
          "vendor-ui": ["lucide-react", "class-variance-authority", "clsx", "tailwind-merge"],
        },
      },
    },
  },
})