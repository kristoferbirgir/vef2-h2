'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type User = { email: string } | null

interface AuthContextType {
  user: User
  login: (creds: { email: string; password: string }) => Promise<void>
  signup: (creds: { email: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)

  const login = async ({ email, password: _password }: { email: string; password: string }) => {
    // Simulate a login (replace with API call)
    void _password
    setUser({ email })
  }

  const signup = async ({ email, password: _password }: { email: string; password: string }) => {
    // Simulate a signup (replace with API call)
    void _password
    setUser({ email })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
