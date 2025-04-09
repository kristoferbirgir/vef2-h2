'use client'

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'

interface UploadResult {
  url: string
  public_id?: string
  // Include additional properties based on your backend response.
}

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('') // optional prompt for the image

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      // Optionally, include a prompt or name for the image.
      if (prompt) {
        formData.append('name', prompt)
      }

      // Use the backend URL from the environment or fallback to your Railway backend
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hopverk.up.railway.app'
      const res = await fetch(`${API_URL}/cloudinary`, {
        method: 'POST',
        body: formData,
        // If you have a global auth mechanism, you might add:
        // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}`)
      }

      const data = await res.json()
      setUploadResult(data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Upload failed:', error.message)
      } else {
        console.error('Upload failed')
      }
    }
    setLoading(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Image Upload</h1>
      <p className="mb-4">Choose an image to upload:</p>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <input
        type="text"
        placeholder="Enter image prompt (optional)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {uploadResult && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Uploaded Image:</h2>
          {uploadResult.public_id && <p className="mb-2">Public ID: {uploadResult.public_id}</p>}
          <Image
            src={uploadResult.url}
            alt="Uploaded image"
            width={400}
            height={300}
            className="border"
          />
        </div>
      )}
    </main>
  )
}
