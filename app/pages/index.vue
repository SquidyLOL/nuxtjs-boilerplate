<template>
  <section class="flex flex-col items-center">
    <h2>
      Welcome to Nuxt.js Boilerplate
    </h2>

    <p class="mx-auto max-w-xl text-center">
      Kickstart your Nuxt.js projects effortlessly with this ready-to-use boilerplate.
      Includes essential configs, presets, and tools so you can focus on building amazing apps.
    </p>

    <div class="my-12 flex flex-row items-center justify-center gap-8">
      <div v-for="feature in features" :key="feature.title" class="flex max-w-xs flex-col items-center gap-4 text-center">
        <icon :name="feature.icon" size="30" />

        <h3>
          {{ feature.title }}
        </h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup language="ts">
const features = [
  {
    title: "Presets",
    description: "Choose from Standard, i18n, or Test setups to fit your needs.",
    icon: "ph:list-heart",
  },
  {
    title: "Built-in Tools",
    description: "ESLint, Prettier, Playwright integration ready to use.",
    icon: "ph:toolbox",
  },
  {
    title: "Easy Setup",
    description: "One CLI command to generate a fully configured Nuxt app.",
    icon: "ph:gear-fine",
  },
]

useHead({
  title: "Nuxt.js Boilerplate",
  link: [{ rel: "canonical", href: "https://nuxtjs-boilerplate.vercel.app" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [
    { name: "description", content: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly." },
    { property: "og:title", content: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly." },
    { property: "og:description", content: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://nuxtjs-boilerplate.vercel.app/og-image.png" },
    { property: "og:url", content: "https://nuxtjs-boilerplate.vercel.app" },
    { name: "google-site-verification", content: "2j0bcfhh8FCYPpzFylzbiPjl3Pa0X7lMuG060ctsCsA" },
  ],
})

useSeoMeta({
  title: "Nuxt.js Boilerplate",
  description: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly.",
  ogTitle: "Nuxt.js Boilerplate",
  ogDescription: "A full-stack starter setup for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly.",
  ogImage: "https://nuxtjs-boilerplate.vercel.app/og-image.png",
  ogUrl: "https://nuxtjs-boilerplate.vercel.app",
})
</script>
