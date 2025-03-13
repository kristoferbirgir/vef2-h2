'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-2xl font-bold">MyApp</span>
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-blue-200">
              About
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/profile" className="text-white hover:text-blue-200">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-white hover:text-blue-200">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className="text-white hover:text-blue-200">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
