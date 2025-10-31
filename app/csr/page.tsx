"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default function CSRPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_limit=6`)
        if (!response.ok) throw new Error("Failed to fetch")

        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError("Veri yüklenirken hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4 bg-transparent">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>

          <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold">Client-Side Rendering (CSR)</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Nasıl Çalışır?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sayfa ilk yüklendiğinde boş HTML gönderilir</li>
                  <li>• JavaScript yüklenir ve çalışır</li>
                  <li>• useEffect ile API çağrısı yapılır</li>
                  <li>• Veri gelince component güncellenir</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Avantajlar & Dezavantajlar</h3>
                <div className="text-sm">
                  <p className="text-green-600 mb-1">✓ Dinamik içerik</p>
                  <p className="text-green-600 mb-1">✓ Kullanıcı etkileşimi</p>
                  <p className="text-red-600 mb-1">✗ Yavaş ilk yükleme</p>
                  <p className="text-red-600">✗ SEO sorunları</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Veriler yükleniyor...</span>
          </div>
        )}

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>Post ID: {post.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3">{post.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
