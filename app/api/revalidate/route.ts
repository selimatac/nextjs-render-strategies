import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json()

    if (!path) {
      return Response.json({ revalidated: false, message: "Path parametresi gerekli" }, { status: 400 })
    }

    // Path'i revalidate et
    revalidatePath(path)

    return Response.json({
      revalidated: true,
      message: `${path} başarıyla revalidate edildi`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return Response.json(
      {
        revalidated: false,
        message: "Revalidation sırasında hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}
