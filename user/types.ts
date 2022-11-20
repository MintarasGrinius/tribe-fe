export interface User {
  showPreview: boolean
  loggedIn: boolean
}

export type UserData = {
  id: number
  email: string
  is_organizer: boolean
} | null
