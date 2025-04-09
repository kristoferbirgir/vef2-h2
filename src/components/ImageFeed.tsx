'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faForward } from '@fortawesome/free-solid-svg-icons'

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

  // Function to fetch a random image and the median rating.
  const fetchImageAndMedian = useCallback(async () => {
    if (!user?.token) {
      console.error('No auth token found')
      return
    }
    
    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }

    try {
      // Fetch random image
      const resImage = await fetch(`${API_BASE_URL}/images/random`, {
        headers: authHeaders,
        credentials: 'include',
      })
      if (resImage.ok) {
        const data: ImageData = await resImage.json()
        setImage(data)
      } else {
        console.error('Failed to fetch random image –', resImage.status)
      }

      // Fetch median rating
      const resMedian = await fetch(`${API_BASE_URL}/images/median`, {
        headers: authHeaders,
        credentials: 'include',
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
  }, [API_BASE_URL, user])

  // On component mount, load an image
  useEffect(() => {
    fetchImageAndMedian()
  }, [fetchImageAndMedian])

  // Function to rate image (score of 1 for like, -1 for dislike)
  const rateImage = async (score: 1 | -1) => {
    if (!user?.token || !image) return
    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }
    try {
      const res = await fetch(`${API_BASE_URL}/images/rate/${image.id}`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ score }),
        credentials: 'include',
      })
      if (res.ok) {
        console.log(`Image rated with score ${score}`)
        // After rating, update the median
        const resMedian = await fetch(`${API_BASE_URL}/images/median`, {
          headers: authHeaders,
          credentials: 'include',
        })
        if (resMedian.ok) {
          const data: MedianData = await resMedian.json()
          setMedian(data.median)
        } else {
          console.error('Failed to fetch median after rating –', resMedian.status)
        }
      } else {
        console.error('Failed to rate image –', res.status)
      }
    } catch (error) {
      console.error('Error rating image:', error)
    }
  }

  // Function to load the next image
  const nextImage = async () => {
    await fetchImageAndMedian()
  }

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
        <p className="text-gray-700 mb-4">Current Median Rating: {median}</p>
      )}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => rateImage(1)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-800"
        >
          <FontAwesomeIcon icon={faThumbsUp} className="w-6 h-6" />
          <span>Like</span>
        </button>
        <button
          onClick={() => rateImage(-1)}
          className="flex items-center space-x-2 text-red-600 hover:text-red-800"
        >
          <FontAwesomeIcon icon={faThumbsDown} className="w-6 h-6" />
          <span>Dislike</span>
        </button>
        <button
          onClick={nextImage}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <FontAwesomeIcon icon={faForward} className="w-6 h-6" />
          <span>Next Image</span>
        </button>
      </div>
    </div>
  )
}
