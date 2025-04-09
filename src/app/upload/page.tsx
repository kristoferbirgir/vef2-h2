'use client'

import { useState, ChangeEvent } from 'react'
import Image from 'next/image'

interface UploadResult {
  public_id: string
  cloud_name: string
  // You can add additional properties if needed.
}

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      // Get signature, timestamp, and cloud name from backend API.
      const sigRes = await fetch('/api/signature')
      const { signature, timestamp, cloudName } = await sigRes.json()

      // Create FormData and append upload details.
      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '')
      formData.append('timestamp', String(timestamp))
      formData.append('signature', signature)
      // Replace with your actual upload preset.
      formData.append('upload_preset', 'your_upload_preset')

      // Post the FormData to Cloudinary.
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })

      const uploadData = await uploadRes.json()
      setUploadResult(uploadData)
    } catch (error) {
      console.error('Upload failed:', error)
    }
    setLoading(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Mynda Stjórnun</h1>
      <p className="mb-4">Veldu mynd til að hlaða upp:</p>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
      >
        {loading ? 'Hlaða upp...' : 'Hlaða upp mynd'}
      </button>
      {uploadResult && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Upphlað mynd:</h2>
          <p className="mb-2">Public ID: {uploadResult.public_id}</p>
          <Image
            src={`https://res.cloudinary.com/${uploadResult.cloud_name}/image/upload/${uploadResult.public_id}.jpg`}
            alt="Upphlað mynd"
            width={400}
            height={300}
            className="border"
          />
        </div>
      )}
    </main>
  )
}
