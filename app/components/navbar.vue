<template>
  <nav class="flex w-full flex-row items-center justify-between gap-2 p-4">
    <div class="flex flex-row items-center gap-2">
      <nuxt-link to="/">
        <icon name="simple-icons:nuxt" size="35" class="text-primary" />
      </nuxt-link>
    </div>

    <div class="flex flex-row items-center gap-2">
      <a href="https://github.com/matimortari/nuxtjs-boilerplate" class="btn">
        <icon name="simple-icons:github" size="20" />
      </a>

      <button class="btn" @click="toggleTheme">
        <icon :name="themeIcon" size="20" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { toggleTheme, themeIcon } = useTheme()
</script>
