import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Globe, Zap, RefreshCw, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Next.js App Router Rendering Strategies
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Globe className="w-12 h-12 mx-auto text-blue-600 mb-2" />
              <CardTitle>CSR</CardTitle>
              <CardDescription>Client-Side Rendering</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                İstemci tarafında JavaScript ile render edilir
              </p>
              <div className="flex flex-row space-x-2">
                <Button asChild className="w-full">
                  <Link href="/csr">CSR</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-transparent"
                  variant="outline"
                >
                  <Link href="/csr-swr">with SWR</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Server className="w-12 h-12 mx-auto text-purple-600 mb-2" />
              <CardTitle>SSR</CardTitle>
              <CardDescription>Server-Side Rendering</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Her istekte sunucuda HTML oluşturulur
              </p>
              <Button asChild className="w-full">
                <Link href="/ssr">SSR Örneği</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 mx-auto text-green-600 mb-2" />
              <CardTitle>SSG</CardTitle>
              <CardDescription>Static Site Generation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Build zamanında statik HTML oluşturulur
              </p>
              <Button asChild className="w-full">
                <Link href="/ssg">SSG Örneği</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <RefreshCw className="w-12 h-12 mx-auto text-orange-600 mb-2" />
              <CardTitle>ISR</CardTitle>
              <CardDescription>Incremental Static Regeneration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Statik sayfalar belirli aralıklarla güncellenir
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/isr">ISR Örneği</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 mx-auto text-indigo-600 mb-2" />
              <CardTitle>GSP</CardTitle>
              <CardDescription>generateStaticParams</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Dynamic route'lar için statik sayfalar
              </p>
              <Button asChild className="w-full">
                <Link href="/posts">GSP Örneği</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Rendering Stratejileri Karşılaştırması
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Strateji</th>
                  <th className="text-left p-3 font-semibold">
                    Ne Zaman Render?
                  </th>
                  <th className="text-left p-3 font-semibold">Performans</th>
                  <th className="text-left p-3 font-semibold">SEO</th>
                  <th className="text-left p-3 font-semibold">
                    Kullanım Alanı
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                    <td className="p-3 font-medium">CSR</td>
                    <td className="p-3">İstemci tarafında</td>
                    <td className="p-3">Yavaş ilk yükleme</td>
                    <td className="p-3">Zayıf</td>
                    <td className="p-3">
                      <ul className="list-disc pl-4">
                        <li>SPA'ler</li>
                        <li>Gerçek zamanlı dashboardlar</li>
                        <li>Kullanıcıya özel içerik</li>
                      </ul>
                    </td>
                </tr>
                <tr className="border-b">
                    <td className="p-3 font-medium">SSR</td>
                    <td className="p-3">Her istekte</td>
                    <td className="p-3">Orta</td>
                    <td className="p-3">İyi</td>
                    <td className="p-3">
                      <ul className="list-disc pl-4">
                        <li>Haber siteleri</li>
                        <li>Bloglar</li>
                        <li>Kullanıcıya göre değişen sayfalar</li>
                      </ul>
                    </td>
                </tr>
                <tr className="border-b">
                    <td className="p-3 font-medium">SSG</td>
                    <td className="p-3">Build zamanında</td>
                    <td className="p-3">Çok hızlı</td>
                    <td className="p-3">Mükemmel</td>
                    <td className="p-3">
                      <ul className="list-disc pl-4">
                        <li>Dokümantasyon siteleri</li>
                        <li>Kataloglar</li>
                        <li>Landing page'ler</li>
                      </ul>
                    </td>
                </tr>
                <tr className="border-b">
                    <td className="p-3 font-medium">ISR</td>
                    <td className="p-3">Belirli aralıklarla</td>
                    <td className="p-3">Hızlı</td>
                    <td className="p-3">İyi</td>
                    <td className="p-3">
                      <ul className="list-disc pl-4">
                        <li>Ürün listeleri</li>
                        <li>Blog post'ları</li>
                        <li>Sık güncellenen statik sayfalar</li>
                      </ul>
                    </td>
                </tr>
                <tr>
                    <td className="p-3 font-medium">GSP</td>
                    <td className="p-3">Build zamanında (dynamic)</td>
                    <td className="p-3">Çok hızlı</td>
                    <td className="p-3">Mükemmel</td>
                    <td className="p-3">
                      <ul className="list-disc pl-4">
                        <li>Dinamik parametreli sayfalar</li>
                        <li>Blog detayları</li>
                        <li>Ürün detayları</li>
                      </ul>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
