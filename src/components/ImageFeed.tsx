'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

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

  useEffect(() => {
    async function fetchData() {
      try {
        const resImage = await fetch(`${API_BASE_URL}/images/random`, {
          credentials: 'include'
        })
        if (resImage.ok) {
          const data: ImageData = await resImage.json()
          setImage(data)
        }
        const resMedian = await fetch(`${API_BASE_URL}/images/median`, {
          credentials: 'include'
        })
        if (resMedian.ok) {
          const data: MedianData = await resMedian.json()
          setMedian(data.median)
        }
      } catch (error) {
        console.error('Error fetching image data:', error)
      }
    }
    fetchData()
  }, [])

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
