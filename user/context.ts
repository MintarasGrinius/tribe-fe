import { createContext } from 'react'

const UserContext = createContext({
  showPreview: false,
  loggedIn: false,
  email: '',
})

export default UserContext
