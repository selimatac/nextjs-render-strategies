"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, RefreshCw, CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ISRAdminPage() {
  const [isRevalidating, setIsRevalidating] = useState(false)
  const [revalidateResult, setRevalidateResult] = useState<{
    success: boolean
    message: string
    timestamp?: string
  } | null>(null)
  const [customPath, setCustomPath] = useState("/isr")

  const handleRevalidate = async (path: string) => {
    setIsRevalidating(true)
    setRevalidateResult(null)

    try {
      const response = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path }),
      })

      const data = await response.json()

      if (response.ok) {
        setRevalidateResult({
          success: true,
          message: `${path} sayfası başarıyla revalidate edildi!`,
          timestamp: new Date().toLocaleString("tr-TR"),
        })
      } else {
        setRevalidateResult({
          success: false,
          message: data.message || "Revalidation başarısız oldu",
        })
      }
    } catch (error) {
      setRevalidateResult({
        success: false,
        message: "Bir hata oluştu: " + (error instanceof Error ? error.message : "Bilinmeyen hata"),
      })
    } finally {
      setIsRevalidating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4 bg-transparent">
            <Link href="/isr">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ISR Sayfasına Dön
            </Link>
          </Button>

          <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
            <div className="flex items-center mb-4">
              <RefreshCw className="w-8 h-8 text-orange-600 mr-3" />
              <h1 className="text-3xl font-bold">ISR Admin Panel</h1>
            </div>

            <p className="text-gray-600 mb-6">
              Bu panel ile ISR sayfalarını manuel olarak revalidate edebilirsiniz. Normalde ISR otomatik olarak belirli
              aralıklarla güncellenir, ancak bu API ile istediğiniz zaman güncelleyebilirsiniz.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">On-Demand Revalidation</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• API route ile manuel tetikleme</li>
                  <li>• revalidatePath() fonksiyonu</li>
                  <li>• Anında cache temizleme</li>
                  <li>• Sonraki istekte yeni veri</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Kullanım Senaryoları</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CMS'den içerik güncellemesi</li>
                  <li>• Webhook ile otomatik güncelleme</li>
                  <li>• Admin panelinden manuel güncelleme</li>
                  <li>• Kritik veri değişikliklerinde</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hızlı Revalidation Butonları */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı Revalidation</CardTitle>
              <CardDescription>Önceden tanımlı sayfaları hızlıca güncelleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handleRevalidate("/isr")}
                disabled={isRevalidating}
                className="w-full"
                variant="outline"
              >
                {isRevalidating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                ISR Sayfasını Güncelle
              </Button>

              <Button
                onClick={() => handleRevalidate("/posts")}
                disabled={isRevalidating}
                className="w-full"
                variant="outline"
              >
                {isRevalidating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Posts Sayfasını Güncelle
              </Button>

              <Button
                onClick={() => handleRevalidate("/")}
                disabled={isRevalidating}
                className="w-full"
                variant="outline"
              >
                {isRevalidating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Ana Sayfayı Güncelle
              </Button>
            </CardContent>
          </Card>

          {/* Özel Path Revalidation */}
          <Card>
            <CardHeader>
              <CardTitle>Özel Path Revalidation</CardTitle>
              <CardDescription>İstediğiniz path'i manuel olarak güncelleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customPath">Path (örn: /posts/1)</Label>
                <Input
                  id="customPath"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  placeholder="/isr"
                  className="mt-1"
                />
              </div>

              <Button
                onClick={() => handleRevalidate(customPath)}
                disabled={isRevalidating || !customPath}
                className="w-full"
              >
                {isRevalidating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Özel Path'i Güncelle
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sonuç Gösterimi */}
        {revalidateResult && (
          <Card className={`mt-8 ${revalidateResult.success ? "border-green-200" : "border-red-200"}`}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {revalidateResult.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <p className={`font-medium ${revalidateResult.success ? "text-green-800" : "text-red-800"}`}>
                    {revalidateResult.message}
                  </p>
                  {revalidateResult.timestamp && (
                    <p className="text-sm text-gray-600">Zaman: {revalidateResult.timestamp}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Kodu Örneği */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Route Kodu</CardTitle>
            <CardDescription>Bu admin panelin arkasındaki API kodu</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { path } = await request.json()
  
  try {
    revalidatePath(path)
    return Response.json({ 
      revalidated: true, 
      now: Date.now() 
    })
  } catch (err) {
    return Response.json({ 
      revalidated: false, 
      message: 'Error revalidating' 
    }, { status: 500 })
  }
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
