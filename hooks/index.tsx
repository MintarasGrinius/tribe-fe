import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext({
  user: { email: '', token: '' },
  setUser: (_: { email: string; token: string }) => {},
})

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState({ email: '', token: '' })

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
