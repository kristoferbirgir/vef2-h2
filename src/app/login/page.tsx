'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUserPlus, faUser, faLock } from '@fortawesome/free-solid-svg-icons'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login({ username, password })
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
      alert(error instanceof Error ? error.message : 'Login error')
    }
  }

  return (
    <main className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Innskráning</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold items-center">
            <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1" />
            Notendanafn:
          </label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold items-center">
            <FontAwesomeIcon icon={faLock} className="w-4 h-4 mr-1" />
            Lykilorð:
          </label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="w-4 h-4" />
          <span>Innskráning</span>
        </button>
      </form>
      <p className="mt-4 text-center">
        Ekki með aðgang?{' '}
        <Link
          href="/signup"
          className="flex items-center justify-center space-x-1 text-teal-600 hover:underline"
        >
          <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
          <span>Skráning</span>
        </Link>
      </p>
    </main>
  )
}
