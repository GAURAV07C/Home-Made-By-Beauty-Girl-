import { NextResponse } from "next/server";
import { deleteAdminProduct, updateAdminProduct } from "@/lib/products";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const payload = {
      name: String(body.name || "").trim(),
      description: String(body.description || "").trim(),
      details: String(body.details || "").trim(),
      price: String(body.price || "").trim(),
      buyLink:
        String(body.amazonLink || "").trim() ||
        String(body.flipkartLink || "").trim() ||
        String(body.meeshoLink || "").trim(),
      amazonLink: String(body.amazonLink || "").trim(),
      flipkartLink: String(body.flipkartLink || "").trim(),
      meeshoLink: String(body.meeshoLink || "").trim(),
    };

    if (!payload.name || !payload.description || !payload.details || !payload.price) {
      return NextResponse.json({ message: "Required fields missing" }, { status: 400 });
    }

    await updateAdminProduct(params.id, payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/products/[id] error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await deleteAdminProduct(params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/admin/products/[id] error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
