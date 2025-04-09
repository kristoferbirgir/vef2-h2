'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

interface RatedImageData {
  id: string
  url: string
  prompt: string
  currentRating: number  // 1 for like, -1 for dislike
}

export default function RatedImagesPage() {
  const [ratedImages, setRatedImages] = useState<RatedImageData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const API_BASE_URL = 'https://hopverk.up.railway.app'
  const { user } = useAuth()

  useEffect(() => {
    async function fetchRatedImages() {
      if (!user?.token) {
        console.error('No auth token found')
        setLoading(false)
        return
      }

      const authHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }

      try {
        const res = await fetch(`${API_BASE_URL}/images/rated`, {
          headers: authHeaders,
          credentials: 'include',
        })
        if (res.ok) {
          const data: RatedImageData[] = await res.json()
          setRatedImages(data)
        } else {
          console.error('Failed to fetch rated images –', res.status)
        }
      } catch (error) {
        console.error('Error fetching rated images:', error)
      }
      setLoading(false)
    }
    fetchRatedImages()
  }, [user])

  if (loading) {
    return <div>Loading your rated images...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Rated Images</h1>
      {ratedImages.length === 0 ? (
        <p>You have not rated any images yet.</p>
      ) : (
        ratedImages.map((img) => (
          <div key={img.id} className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="relative w-full h-64 mb-4">
              <Image
                src={img.url}
                alt={img.prompt}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="text-gray-700 mb-2">Prompt: {img.prompt}</p>
            <div className="flex items-center space-x-2">
              {img.currentRating === 1 ? (
                <div className="flex items-center space-x-1 text-green-600">
                  <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5" />
                  <span>Liked</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-red-600">
                  <FontAwesomeIcon icon={faThumbsDown} className="w-5 h-5" />
                  <span>Disliked</span>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
