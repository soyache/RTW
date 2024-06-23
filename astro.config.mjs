import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  site: "https://roatantours.com",
  integrations: [tailwind(), icon()],
  vite: {
    define: {
      "import.meta.env.SCRIPT_URL": JSON.stringify(process.env.SCRIPT_URL),
    },
  },
});
