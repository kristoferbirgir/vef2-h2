'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type User = { name: string; email: string; password: string } | null

interface AuthContextType {
  user: User
  login: (creds: { email: string; password: string }) => Promise<void>
  // Make "name" optional temporarily
  signup: (creds: { name?: string; email: string; password: string }) => Promise<void>
  logout: () => void
  updateProfile: (updates: { name: string; email: string; password: string }) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)

  const login = async ({ email, password }: { email: string; password: string }) => {
    // Simulate login with a default name if needed
    setUser({ name: "Default User", email, password })
  }

  const signup = async ({
    name,
    email,
    password,
  }: {
    name?: string
    email: string
    password: string
  }) => {
    // Temporarily use the provided name, or a default if missing.
    setUser({ name: name || "Temporary Name", email, password })
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updates: { name: string; email: string; password: string }) => {
    setUser(updates)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
