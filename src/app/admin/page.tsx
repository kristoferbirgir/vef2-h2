'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/')
    }
  }, [user, router])

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      alert('Veldu mynd fyrst')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('prompt', prompt)

      const res = await fetch('https://hopverk.up.railway.app/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.token || ''}`
        },
        body: formData
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Upload failed')
        return
      }

      const data = await res.json()
      alert(`Mynd hlaðin upp: ${data.image.id}`)
    } catch (err: unknown) {
      console.error(err)
      alert(err instanceof Error ? err.message : 'Villa við að hlaða upp')
    }
  }

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Admin Dashboard</h1>

      <form onSubmit={handleUpload} className="flex flex-col gap-2 max-w-sm">
        <label>
          Veldu mynd:
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0])
              }
            }}
          />
        </label>
        <label>
          Prompt / Lýsing:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          Hlaða upp
        </button>
      </form>
    </div>
  )
}
