<template>
  <div class="flex h-screen flex-col items-center justify-center gap-4">
    <h1>
      {{ error?.statusCode }}
    </h1>

    <p class="text-center text-muted-foreground">
      {{ error?.statusMessage || "Unknown error" }}
    </p>

    <nuxt-link to="/">
      Go back home
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps({
  error: Object as () => NuxtError,
})
</script>
