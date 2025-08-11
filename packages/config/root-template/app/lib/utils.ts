export function formatDate(dateString: Date) {
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  })

  return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}

export function copyToClipboard(val: string) {
  if (val)
    navigator.clipboard.writeText(val)
}

export function getBaseUrl(): string {
  const config = useRuntimeConfig()
  const url = config.public.baseUrl
  if (!url || typeof url !== "string") {
    throw new Error("Base URL is not defined in runtime config.")
  }

  return url
}
