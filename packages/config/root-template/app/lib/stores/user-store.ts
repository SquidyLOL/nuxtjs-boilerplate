export const useUserStore = defineStore("user", () => {
  const user = ref<Record<string, any> | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function getUser() {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch("api/user", {
        method: "GET",
      })
      if (!response.ok)
        throw new Error(response.statusText)

      user.value = await response.json()
      return user.value
    }
    catch (err: any) {
      error.value = err?.message || "Failed to get user"
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteUser() {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch("api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok)
        throw new Error(response.statusText)

      const result = await response.json()
      user.value = null
      return result
    }
    catch (err: any) {
      error.value = err?.message || "Failed to delete user"
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, error, getUser, deleteUser }
})
