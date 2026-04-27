import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://excel-analytics-backend-y6sg.onrender.com", 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
