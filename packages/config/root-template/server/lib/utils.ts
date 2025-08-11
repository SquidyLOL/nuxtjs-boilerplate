import type { EventHandlerRequest, H3Event } from "h3"

export async function getUserFromSession(event: H3Event<EventHandlerRequest>) {
  const session = await getUserSession(event)
  if (session?.user?.id) {
    return session.user
  }

  const authHeader = event.node.req.headers.authorization
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  return session.user
}
