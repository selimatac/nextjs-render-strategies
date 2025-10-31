"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowLeft, RefreshCw, Wifi, WifiOff } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// SWR için fetcher fonksiyonu
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CSRSWRPage() {
  // SWR hook'u - otomatik cache, revalidation, error handling
  const {
    data: posts,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR<Post[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_limit=6`,
    fetcher,
    {
      refreshInterval: 60000, // 60 saniyede bir otomatik refresh
      revalidateOnFocus: true, // Pencere focus olduğunda revalidate
      revalidateOnReconnect: true, // İnternet bağlantısı geri geldiğinde revalidate
      dedupingInterval: 5000, // 5 saniye içinde aynı request'i tekrar yapma
      refreshWhenOffline: true, // Offline olsa bile arka planda yenile
    }
  );

  const handleManualRefresh = () => {
    mutate(); // Manuel olarak veriyi yenile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-8">
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
              <Globe className="w-8 h-8 text-cyan-600 mr-3" />
              <h1 className="text-3xl font-bold">
                Client-Side Rendering + SWR
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">SWR Özellikleri</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Otomatik cache yönetimi</li>
                  <li>• Background'da veri güncelleme</li>
                  <li>• Focus/reconnect revalidation</li>
                  <li>• Error retry mekanizması</li>
                  <li>• Optimistic updates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Avantajlar</h3>
                <div className="text-sm">
                  <p className="text-green-600 mb-1">✓ Gerçek zamanlı veri</p>
                  <p className="text-green-600 mb-1">✓ Otomatik cache</p>
                  <p className="text-green-600 mb-1">✓ Offline desteği</p>
                  <p className="text-green-600">✓ Kolay kullanım</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant={isLoading ? "destructive" : "secondary"}>
                  {isLoading ? "Yükleniyor..." : "Yüklendi"}
                </Badge>
                <Badge variant={isValidating ? "default" : "outline"}>
                  {isValidating ? (
                    <>
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                      Güncelleniyor
                    </>
                  ) : (
                    "Güncel"
                  )}
                </Badge>
                <Badge variant={error ? "destructive" : "secondary"}>
                  {error ? (
                    <>
                      <WifiOff className="w-3 h-3 mr-1" />
                      Hata
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3 h-3 mr-1" />
                      Bağlı
                    </>
                  )}
                </Badge>
              </div>

              <Button
                onClick={handleManualRefresh}
                disabled={isValidating}
                size="sm"
              >
                {isValidating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Manuel Yenile
              </Button>
            </div>
          </div>
        </div>

        {/* SWR Konfigürasyon Bilgisi */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>SWR Konfigürasyonu</CardTitle>
            <CardDescription>
              Bu sayfada kullanılan SWR ayarları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Otomatik Özellikler:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • <strong>refreshInterval:</strong> 60 saniye
                  </li>
                  <li>
                    • <strong>revalidateOnFocus:</strong> true
                  </li>
                  <li>
                    • <strong>revalidateOnReconnect:</strong> true
                  </li>
                  <li>
                    • <strong>dedupingInterval:</strong> 5 saniye
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Test Edin:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Başka sekmeye geçip geri dönün</li>
                  <li>• İnterneti kapatıp açın</li>
                  <li>• 30 saniye bekleyin (otomatik refresh)</li>
                  <li>• Manuel yenile butonunu kullanın</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="mb-8 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-600">
                <WifiOff className="w-6 h-6" />
                <div>
                  <p className="font-medium">Veri yüklenirken hata oluştu</p>
                  <p className="text-sm text-red-500">
                    {error.message || "Bilinmeyen hata"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-cyan-600" />
            <span className="ml-2 text-lg">SWR ile veriler yükleniyor...</span>
          </div>
        )}

        {/* Posts Grid */}
        {posts && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription>Post ID: {post.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* SWR Kod Örneği */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>SWR Kullanım Örneği</CardTitle>
            <CardDescription>Bu sayfada kullanılan SWR kodu</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const { data, error, isLoading, mutate, isValidating } = useSWR(
  'https://api.example.com/posts',
  fetcher,
  {
    refreshInterval: 60000,        // 60s otomatik refresh
    revalidateOnFocus: true,       // Focus'ta revalidate
    revalidateOnReconnect: true,   // Reconnect'te revalidate
    dedupingInterval: 5000,        // 5s deduping
  }
)

// Manuel refresh
const handleRefresh = () => mutate()`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
