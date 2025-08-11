declare module "#auth-utils" {
  interface User {
    id: string
    email: string
    name: string
    image?: string | null
  }

  interface UserSession {
    user: User
    loggedInAt: Date
  }
}
