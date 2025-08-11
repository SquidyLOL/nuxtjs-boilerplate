<template>
  <nav class="flex w-full flex-row items-center justify-between gap-2 p-4">
    <div class="flex flex-row items-center gap-2">
      <nuxt-link to="/">
        <icon name="simple-icons:nuxt" size="35" class="text-primary" />
      </nuxt-link>

      <div v-if="userStore.user" class="flex flex-row items-center gap-2">
        <p class="text-sm">
          Hi, <span class="font-semibold text-primary">{{ userStore.user?.name }}</span>
        </p>
        <button class="btn" @click="signOut">
          Logout
        </button>
      </div>

      <div v-else class="flex flex-row items-center gap-2">
        <p class="text-sm">
          Unauthenticated
        </p>
        <nuxt-link to="/sign-in" class="btn">
          Sign In
        </nuxt-link>
      </div>
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
import { useUserStore } from "~/lib/stores/user-store"

const { clear } = useUserSession()
const { toggleTheme, themeIcon } = useTheme()
const userStore = useUserStore()

onMounted(async () => {
  try {
    await userStore.getUser()
  }
  catch (error) {
    console.error("Failed to fetch user:", error)
  }
})

function signOut() {
  clear()
  window.location.href = "/"
}
</script>
