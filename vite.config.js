import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    rollupOptions: {
      input: "./src/main.jsx", // Ensure this is correct
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vendor: ["react", "react-dom"],
  //         charts: ["./src/components/charts.jsx"],
  //       },
  //     },
  //   },
  // },
});
