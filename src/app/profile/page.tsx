'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEdit, faSave, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setUsername(user.username)
      setRole(user.role)
    }
  }, [user, router])

  if (!user) return null 

  const handleSave = () => {
    updateProfile({ username, role, password: '' }) 
    setIsEditing(false)
  }

  return (
    <main className="bg-white p-6 rounded shadow max-w-lg mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Prófíll</h1>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="font-semibold flex items-center">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1" />
              Notendanafn:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="font-semibold flex items-center">
              <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4 mr-1" />
              Hlutverk (role):
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
            <span className="font-semibold">Notendanafn:</span> {user.username}
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faLock} className="w-4 h-4 mr-2" />
            <span className="font-semibold">Notendakenni (ID):</span> {user.id}
          </p>
          <p className="flex items-center">
            <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4 mr-2" />
            <span className="font-semibold">Hlutverk (role):</span> {user.role}
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
