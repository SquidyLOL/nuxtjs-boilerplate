import type { H3Event } from "h3"
import { handleOAuthUser } from "#server/lib/auth"

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
    clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
    clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
    redirectURL: `${process.env.NUXT_PUBLIC_BASE_URL}/api/auth/github`,
  },

  async onSuccess(event: any, { user, tokens }: any) {
    if (!user || typeof user !== "object") {
      throw createError({ statusCode: 400, statusMessage: "Invalid user data received from GitHub" })
    }

    const githubId = user.id?.toString()
    const email = user.email
    const name = user.name
    const picture = user.avatar_url

    console.log("Received tokens from GitHub:", JSON.stringify(tokens, null, 2))
    console.log("Extracted user data from GitHub:", { githubId, email, name, picture })
    if (!githubId || !email) {
      throw createError({ statusCode: 400, statusMessage: "Missing required user data from GitHub" })
    }

    return handleOAuthUser(event, {
      id: githubId,
      name,
      email,
      image: picture,
      provider: "github",
    })
  },
  async onError(event: H3Event, error: any) {
    console.error("GitHub OAuth error:", error)
    if (!event || !event.node?.res) {
      throw createError({ statusCode: 500, statusMessage: "Internal server error" })
    }

    return sendRedirect(event, "/sign-in?error=github_oauth_failed")
  },
})
