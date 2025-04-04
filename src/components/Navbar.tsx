'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
  }

  return (
    <nav className="bg-teal-600 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          KRAB
        </Link>
        <div>
          {user ? (
            <div className="relative inline-block">
              <button
                onClick={handleToggleDropdown}
                className="text-white hover:text-teal-200 flex items-center focus:outline-none"
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1" />
                {user.username}
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded shadow-md py-2 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Mínar síður
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-1" />
                    Útskráning
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-white hover:text-teal-200 flex items-center">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1" />
              Innskráning
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
