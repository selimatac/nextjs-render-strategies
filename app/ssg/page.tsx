import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Bu fonksiyon build zamanında çalışır
async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_limit=6`
  );
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

export default async function SSGPage() {
  const posts = await getPosts();
  const buildTime = new Date().toLocaleString("tr-TR");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
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
              <Zap className="w-8 h-8 text-green-600 mr-3" />
              <h1 className="text-3xl font-bold">
                Static Site Generation (SSG)
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Nasıl Çalışır?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Build zamanında API çağrısı yapılır</li>
                  <li>• HTML statik olarak oluşturulur</li>
                  <li>• CDN'de cache edilir</li>
                  <li>• Anında yüklenir</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Avantajlar & Dezavantajlar
                </h3>
                <div className="text-sm">
                  <p className="text-green-600 mb-1">✓ Çok hızlı yükleme</p>
                  <p className="text-green-600 mb-1">✓ Mükemmel SEO</p>
                  <p className="text-red-600 mb-1">✗ Statik içerik</p>
                  <p className="text-red-600">✗ Build gerekli</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-100 rounded">
              <p className="text-sm text-green-800">
                <strong>Build Zamanı:</strong> {buildTime}
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
