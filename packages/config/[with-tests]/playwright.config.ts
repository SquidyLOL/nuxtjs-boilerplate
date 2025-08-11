import type { ConfigOptions } from "@nuxt/test-utils/playwright"
import { fileURLToPath } from "node:url"
import { defineConfig } from "@playwright/test"

export default defineConfig<ConfigOptions>({
  outputDir: "./tests/e2e/test-results",
  testDir: "./tests/e2e",
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL(".", import.meta.url)),
    },
  },
})
