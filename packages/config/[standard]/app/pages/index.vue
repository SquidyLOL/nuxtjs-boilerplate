<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="flex w-full flex-col items-center gap-4 p-4">
      <div class="flex flex-col items-center gap-2 text-center">
        <icon name="simple-icons:nuxt" size="50" class="text-primary" />
        <h1>
          Nuxt.js Boilerplate
        </h1>
        <h4 class="text-primary">
          A ready to use starter kit for all kinds of projects.
        </h4>
      </div>

      <nuxt-link to="/" class="btn">
        Home
      </nuxt-link>
    </header>

    <hr class="w-4/5 border-primary">

    <div class="flex flex-col items-center gap-4 text-center">
      <h3>
        Packed with <span class="text-primary">features</span> to use
      </h3>
    </div>

    <div class="flex flex-col items-center gap-2">
      <ul class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <li v-for="(feature, index) in features" :key="index" class="flex flex-row items-center gap-2 text-xs font-semibold lg:text-sm">
          <icon :name="feature.icon" :size="20" class="text-primary" />
          <span>{{ feature.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Home",
  meta: [{ name: "description", content: "Home page." }],
})

useSeoMeta({
  title: "Home",
  description: "Home page.",
})

const features = [
  { icon: "simple-icons:nuxtdotjs", label: "Nuxt 4" },
  { icon: "simple-icons:typescript", label: "TypeScript" },
  { icon: "simple-icons:tailwindcss", label: "Tailwind CSS" },
  { icon: "simple-icons:iconify", label: "Nuxt Icons" },
  { icon: "ph:text-aa", label: "Google Fonts" },
  { icon: "mdi:fruit-pineapple", label: "Pinia" },
  { icon: "ph:lock-key-open", label: "OAuth" },
  { icon: "simple-icons:prisma", label: "Prisma" },
  { icon: "simple-icons:eslint", label: "ESLint" },
  { icon: "simple-icons:vercel", label: "Vercel Analytics" },
]
</script>
