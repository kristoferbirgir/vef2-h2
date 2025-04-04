'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import ImageFeed from '@/components/ImageFeed'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-12">
      {user ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Velkominn, {user.username}</h1>
          <ImageFeed />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Velkominn á KRAB</h1>
          <p className="text-gray-700 mb-6">
            Discover a new way to engage with posts. Vote with a like or dislike and see an average score based on user feedback.
          </p>
          <div className="text-center">
            <Link
              href="/login"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Skráðu þig inn
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
