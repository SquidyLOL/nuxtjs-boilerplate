import { expect, test } from "@nuxt/test-utils/playwright"

test.setTimeout(60000) // 60 seconds

test("home page displays main heading", async ({ page, goto }) => {
  await goto("/", { waitUntil: "load" }) // less strict than hydration
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Nuxt.js Boilerplate - with Testing Setup")
})
