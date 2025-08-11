<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="my-4 flex flex-col items-center justify-center gap-2">
      <h2>
        Sign In
      </h2>
    </header>

    <div class="my-4 flex flex-col items-center gap-4">
      <p class="text-lg font-semibold text-muted-foreground">
        Choose a provider to continue.
      </p>
      <div class="flex flex-row items-center gap-4">
        <button
          v-for="provider in providers" :key="provider.name"
          class="btn" @click="navigateTo(`/api/auth/${provider.name}`, { external: true })"
        >
          <icon :name="provider.icon" size="25" />
          <span>{{ provider.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const providers = [
  {
    name: "github",
    label: "Sign In With GitHub",
    icon: "simple-icons:github",
  },
  {
    name: "google",
    label: "Sign In With Google",
    icon: "simple-icons:google",
  },
]

useHead({
  title: "Sign In",
  meta: [{ name: "description", content: "Sign In page" }],
})

useSeoMeta({
  title: "Sign In",
  description: "Sign In page",
})
</script>
