import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_limit=8`
  );
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
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
              <FileText className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold">
                generateStaticParams ile Blog Listesi
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Bu Sayfa Nasıl Çalışır?
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Bu liste sayfası SSG ile oluşturuldu</li>
                  <li>• Her post için dynamic route var</li>
                  <li>
                    • generateStaticParams ile tüm post sayfaları build'de
                    oluşturulacak
                  </li>
                  <li>• Bir post'a tıklayın ve hızını görün!</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  generateStaticParams Avantajları
                </h3>
                <div className="text-sm">
                  <p className="text-green-600 mb-1">
                    ✓ Dynamic route'lar için SSG
                  </p>
                  <p className="text-green-600 mb-1">
                    ✓ Build zamanında tüm sayfalar hazır
                  </p>
                  <p className="text-green-600 mb-1">✓ Mükemmel performans</p>
                  <p className="text-green-600">✓ SEO dostu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription>Post #{post.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {post.body}
                </p>
                <Button asChild className="w-full" size="sm">
                  <Link prefetch={false} href={`/posts/${post.id}`}>
                    Detayı Gör
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
