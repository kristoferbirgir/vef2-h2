import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/context/AuthContext"
import { ReactNode } from "react"

export const metadata = {
  title: "vef2-h2",
  description: "Hópverkefni 2 with Next.js 13 + Tailwind",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-white text-slate-900 min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 bg-white shadow-lg rounded-md mt-4">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
