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

interface RatingInfo {
  likeCount: number
  dislikeCount: number
  likePercentage: number
}

export default function ImageFeed() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [ratingInfo, setRatingInfo] = useState<RatingInfo | null>(null)
  const [finished, setFinished] = useState<boolean>(false)
  const API_BASE_URL = 'https://hopverk.up.railway.app'
  const { user } = useAuth()

  // Function to fetch a random image and then its ratings info.
  const fetchImageAndRatings = useCallback(async () => {
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

      if (resImage.status === 404) {
        setFinished(true)
        setImage(null)
        setRatingInfo(null)
        return
      } else if (resImage.ok) {
        const data: ImageData = await resImage.json()
        setImage(data)
        setFinished(false)
        
        // Once we have an image, fetch its rating breakdown.
        const resRatings = await fetch(`${API_BASE_URL}/images/${data.id}/ratings`, {
          headers: authHeaders,
          credentials: 'include',
        })
        if (resRatings.ok) {
          const ratingData: RatingInfo = await resRatings.json()
          setRatingInfo(ratingData)
        } else {
          console.error('Failed to fetch rating info –', resRatings.status)
        }
      } else {
        console.error('Failed to fetch random image –', resImage.status)
      }
    } catch (error) {
      console.error('Error fetching image data:', error)
    }
  }, [API_BASE_URL, user])

  useEffect(() => {
    fetchImageAndRatings()
  }, [fetchImageAndRatings])

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
        // Refresh the rating breakdown after rating.
        const resRatings = await fetch(`${API_BASE_URL}/images/${image.id}/ratings`, {
          headers: authHeaders,
          credentials: 'include',
        })
        if (resRatings.ok) {
          const ratingData: RatingInfo = await resRatings.json()
          setRatingInfo(ratingData)
        } else {
          console.error('Failed to fetch rating info after rating –', resRatings.status)
        }
      } else {
        console.error('Failed to rate image –', res.status)
      }
    } catch (error) {
      console.error('Error rating image:', error)
    }
  }

  // Function to load the next image.
  const nextImage = async () => {
    await fetchImageAndRatings()
  }

  if (finished) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Finished Rating</h2>
        <p>There are no more images left to rate. Thank you!</p>
      </div>
    )
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
      {ratingInfo && (
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Likes:</strong> {ratingInfo.likeCount} &nbsp;
            <strong>Dislikes:</strong> {ratingInfo.dislikeCount} &nbsp;
            <strong>Like Percentage:</strong> {ratingInfo.likePercentage.toFixed(1)}%
          </p>
        </div>
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
          <span>Næsta mynd</span>
        </button>
      </div>
    </div>
  )
}
