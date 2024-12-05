import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Allows '@' as a shortcut to 'src'
      components: path.resolve(__dirname, "src/components"), // Optional alias for 'components'
      pages: path.resolve(__dirname, "src/pages"), // Optional alias for 'components'
      utils: path.resolve(__dirname, "src/utils"), // Optional alias for 'components'
      context: path.resolve(__dirname, "src/context"), // Optional alias for 'components'
      assets: path.resolve(__dirname, "src/assets"), // Optional alias for 'components'
    },
  },
});
