import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Bu fonksiyon her istekte çalışır
async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_limit=6`,
    {
      cache: "no-store", // SSR için cache'i devre dışı bırak
    }
  );
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

export default async function SSRPage() {
  const posts = await getPosts();
  const requestTime = new Date().toLocaleString("tr-TR");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-8">
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
              <Server className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold">
                Server-Side Rendering (SSR)
              </h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Nasıl Çalışır?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Her istekte sunucuda çalışır</li>
                  <li>• API çağrısı sunucuda yapılır</li>
                  <li>• HTML hazır olarak gönderilir</li>
                  <li>• Güncel veri her zaman</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Cache Kullanımı</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    <strong>default:</strong>
                    Cache varsa kullanır, yoksa ağdan çeker.
                  </li>
                  <li>
                    <strong>no-store:</strong> Her istekte sunucudan yeni veri
                    alınır.
                  </li>
                  <li>
                    <strong>reload:</strong> Cache yok sayılır, sunucudan
                    yeniden alınır ve cache güncellenir.
                  </li>
                  <li>
                    <strong>no-cache:</strong> Cache’teki veri kullanılabilir
                    ama önce sunucuya doğrulama isteği (revalidation)
                    gönderilir.
                  </li>
                  <li>
                    <strong>force-cache:</strong> Eğer cache varsa, ağa hiç
                    gitmeden cache kullanılır, yoksa sunucudan alınır ve
                    cache’e kaydedilir.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Avantajlar & Dezavantajlar
                </h3>
                <div className="text-sm">
                  <p className="text-green-600 mb-1">✓ Güncel veri</p>
                  <p className="text-green-600 mb-1">✓ İyi SEO</p>
                  <p className="text-red-600 mb-1">✗ Sunucu yükü</p>
                  <p className="text-red-600">✗ Yavaş response</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-purple-100 rounded">
              <p className="text-sm text-purple-800">
                <strong>İstek Zamanı:</strong> {requestTime}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Sayfayı yenilediğinizde bu zaman güncellenecek
              </p>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
}
