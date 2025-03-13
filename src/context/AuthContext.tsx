'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type User = { email: string } | null

interface AuthContextType {
  user: User
  login: (creds: { email: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)

  const login = async ({ email, password: _password }: { email: string; password: string }) => {
    // Explicitly use _password to avoid ESLint's unused variable warning.
    void _password
    // TODO: Replace with an actual API call to your backend.
    // For now, simulate a successful login by setting the user.
    setUser({ email })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
