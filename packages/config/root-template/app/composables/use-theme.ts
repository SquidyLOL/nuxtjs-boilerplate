export function useTheme() {
  const colorMode = useState<"light" | "dark">("theme", () => "light")
  const storageKey = "nuxt-color-mode"

  const updateHtmlClass = () => {
    const html = document.documentElement
    html.classList.remove("light", "dark")
    html.classList.add(colorMode.value)
  }

  const syncThemeFromLocalStorage = () => {
    const saved = localStorage.getItem(storageKey)
    if (saved === "dark" || saved === "light") {
      colorMode.value = saved
    }
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      colorMode.value = prefersDark ? "dark" : "light"
    }
    updateHtmlClass()
  }

  const toggleTheme = () => {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark"
    localStorage.setItem(storageKey, colorMode.value)
    updateHtmlClass()
  }

  onMounted(() => {
    syncThemeFromLocalStorage()
  })

  const themeIcon = computed(() =>
    colorMode.value === "light" ? "ph:moon" : "ph:sun",
  )

  return {
    colorMode,
    toggleTheme,
    themeIcon,
  }
}
