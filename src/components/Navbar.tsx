'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-teal-600 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-2xl font-bold">MyApp</span>
        </Link>
        <ul className="flex space-x-6">
          {user ? (
            <>
              <li>
                <Link href="/profile" className="text-white hover:text-teal-200">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-white hover:text-teal-200">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className="text-white hover:text-teal-200">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
