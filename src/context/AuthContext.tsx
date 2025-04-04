'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

const API_BASE_URL = 'https://hopverk.up.railway.app'

type User = {
  id: string
  username: string
  role: string
  token?: string
} | null

interface AuthContextType {
  user: User
  login: (creds: { username: string; password: string }) => Promise<void>
  signup: (creds: { username: string; password: string }) => Promise<void>
  logout: () => void
  updateProfile: (updates: { username: string; password: string; role: string }) => void
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

  const login = async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || 'Login failed')
    }

    const data = await response.json()
    setUser({
      id: data.userId,
      username,
      role: data.role,
      token: data.token,
    })
  }

  const signup = async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || 'Signup failed')
    }

    const data = await response.json()
    setUser({
      id: data.id || data.userId || 'temp-id',
      username,
      role: 'PLAYER',
    })
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = ({ username, role }: { username: string; role: string }) => {
    if (!user) return
    setUser({ ...user, username, role })
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
