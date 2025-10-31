import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  // const posts = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_limit=6`
  // )
  //   .then((res) => res.json())
  //   .then((posts: Post[]) =>
  //     posts.map((post) => ({
  //       id: post.id.toString(),
  //     }))
  //   );

  // //[{ id: '1' }, { id: '2' }, ...]

  return [];
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`
    );
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getUser(userId: number): Promise<PostUser | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`
    );
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const user = await getUser(post.userId);
  const buildTime = new Date().toLocaleString("tr-TR");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4 bg-transparent">
            <Link href="/posts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Post Listesine Dön
            </Link>
          </Button>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Post #{post.id}</Badge>
                <Badge variant="outline">
                  generateStaticParams ile oluşturuldu
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                {user && (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4"
                      style={{
                        backgroundImage:
                          'url("https://via.placeholder.com/16")',
                        backgroundSize: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    <span>
                      {user.name} (@{user.username})
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Build Zamanı: {buildTime}</span>
                </div>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  generateStaticParams Nasıl Çalışıyor?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">1. Build Zamanında:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• generateStaticParams çalışır</li>
                      <li>• Tüm post ID'leri alınır</li>
                      <li>• Her ID için statik sayfa oluşturulur</li>
                      <li>• HTML dosyaları hazırlanır</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2. Runtime'da:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Sayfa anında yüklenir</li>
                      <li>• API çağrısı yok</li>
                      <li>• Mükemmel performans</li>
                      <li>• SEO dostu</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">İçerik</h2>
              <p className="text-gray-700 leading-relaxed">{post.body}</p>
            </div>

            {user && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Yazar Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span
                        className="w-6 h-6"
                        style={{
                          backgroundImage:
                            'url("https://via.placeholder.com/24")',
                          backgroundSize: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-600">@{user.username}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
