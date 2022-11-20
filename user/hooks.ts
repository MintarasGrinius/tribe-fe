import { useState, useEffect } from 'react'
import { getUser } from './data'
import { User } from './types'

export const useUser: () => {
  user: User
} = () => {
  const [user, setUser] = useState<User>({
    loggedIn: false,
    showPreview: false,
  })

  useEffect(() => {
    getUser().then((u) => {
      setUser(u)
    })
  }, [])

  return { user }
}
