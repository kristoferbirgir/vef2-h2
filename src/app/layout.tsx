import "@/styles/globals.css";
import Navbar from '../components/Navbar'
import { AuthProvider } from '../context/AuthContext'
import { ReactNode } from 'react'

export const metadata = {
  title: 'vef2-h2',
  description: 'Hópverkefni 2 with Next.js 13 + Tailwind',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          <Navbar />
          <div className="container mx-auto px-4 py-6">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
