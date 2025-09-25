import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), solid()],
  base: "/counter/",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  }
});
