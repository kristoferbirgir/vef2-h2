'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faEdit, faSave } from '@fortawesome/free-solid-svg-icons'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setName(user.name)
      setEmail(user.email)
      setPassword(user.password)
    }
  }, [user, router])

  if (!user) return null

  const handleSave = () => {
    updateProfile({ name, email, password })
    setIsEditing(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Prófíll</h1>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="font-semibold flex items-center">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1" />
              Nafn:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="font-semibold flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-1" />
              Netfang:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="font-semibold flex items-center">
              <FontAwesomeIcon icon={faLock} className="w-4 h-4 mr-1" />
              Lykilorð:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
            <span>Vista breytingar</span>
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="mt-2 text-teal-600 hover:underline"
          >
            Hætta við
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2" />
            <span className="font-semibold">Nafn:</span> {user.name}
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2" />
            <span className="font-semibold">Netfang:</span> {user.email}
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faLock} className="w-4 h-4 mr-2" />
            <span className="font-semibold">Lykilorð:</span> {user.password}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
            <span>Breyta prófíli</span>
          </button>
        </div>
      )}
    </main>
  )
}
