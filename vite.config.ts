import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// User site → https://aritrade.github.io (repo: aritrade.github.io)
// If you ever move this to a project repo instead, change base to
// "/<repo-name>/" (e.g. "/aritra-personal-site/").
export default defineConfig({
  plugins: [react()],
  base: "/",
});
