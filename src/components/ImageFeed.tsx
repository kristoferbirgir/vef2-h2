'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

interface ImageData {
  id: string
  url: string
  prompt: string
  createdAt: string
}

interface MedianData {
  median: number
}

export default function ImageFeed() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [median, setMedian] = useState<number | null>(null)
  const API_BASE_URL = 'https://hopverk.up.railway.app'
  const { user } = useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        // Ensure we have a token before calling the endpoint
        if (!user?.token) {
          console.error('No auth token found')
          return
        }

        // Send the token in the header
        const authHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        }

        const resImage = await fetch(`${API_BASE_URL}/images/random`, {
          headers: authHeaders,
          credentials: 'include'
        })

        if (resImage.ok) {
          const data: ImageData = await resImage.json()
          setImage(data)
        } else {
          console.error('Failed to fetch random image –', resImage.status)
        }

        const resMedian = await fetch(`${API_BASE_URL}/images/median`, {
          headers: authHeaders,
          credentials: 'include'
        })

        if (resMedian.ok) {
          const data: MedianData = await resMedian.json()
          setMedian(data.median)
        } else {
          console.error('Failed to fetch median –', resMedian.status)
        }
      } catch (error) {
        console.error('Error fetching image data:', error)
      }
    }
    fetchData()
  }, [user])

  if (!image) {
    return <div>Loading image...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Random Image</h2>
      <div className="relative w-full h-64 mb-4">
        <Image 
          src={image.url} 
          alt={image.prompt} 
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <p className="text-gray-700 mb-2">Prompt: {image.prompt}</p>
      {median !== null && (
        <p className="text-gray-700">Current Median Rating: {median}</p>
      )}
    </div>
  )
}
