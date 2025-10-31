import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// ISR ile 60 saniyede bir revalidate
async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_limit=8`,
    {
      next: { revalidate: 60, tags: ["posts"] }, // 60 saniyede bir revalidate
    }
  );
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

export default async function ISRPage() {
  const posts = await getPosts();
  const generateTime = new Date().toLocaleString("tr-TR");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-8">
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
              <RefreshCw className="w-8 h-8 text-orange-600 mr-3" />
              <h1 className="text-3xl font-bold">
                Incremental Static Regeneration (ISR)
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Nasıl Çalışır?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• İlk build'de statik oluşturulur</li>
                  <li>• Belirli süre sonra arka planda güncellenir</li>
                  <li>• Eski sayfa gösterilir, yeni hazırlanır</li>
                  <li>• Sonraki istekte yeni sayfa gösterilir</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Avantajlar & Dezavantajlar
                </h3>
                <div className="text-sm">
                  <p className="text-green-600 mb-1">✓ Hızlı yükleme</p>
                  <p className="text-green-600 mb-1">✓ Güncel içerik</p>
                  <p className="text-red-600 mb-1">✗ Karmaşık cache</p>
                  <p className="text-red-600">✗ Gecikmeli güncelleme</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-orange-100 rounded">
              <p className="text-sm text-orange-800">
                <strong>Son Güncelleme:</strong> {generateTime}
              </p>
              <p className="text-xs text-orange-600 mt-1">
                Bu sayfa 60 saniyede bir güncellenir (revalidate: 60)
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 text-center">
          <Button
            asChild
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Link href="/isr/admin">
              🔄 ISR Admin Panel - Manuel Revalidation
            </Link>
          </Button>
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
