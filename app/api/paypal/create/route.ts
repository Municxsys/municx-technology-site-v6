import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";

export async function POST(req: NextRequest) {
  try {
    const { tier } = await req.json();
    if (!tier || !["LITE","PRO","ENT"].includes(tier)) {
      return NextResponse.json({ error: "invalid tier" }, { status: 400 });
    }
    const origin = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get("origin") || "http://localhost:3000";
    const ret = `${origin}/products/municx-suite?paypal=success`;
    const cancel = `${origin}/products/municx-suite?paypal=canceled`;
    const order = await createOrder(tier, ret, cancel);
    const approve = order.links?.find((l: any) => l.rel === "approve")?.href;
    if (!approve) return NextResponse.json({ error: "no approve url" }, { status: 500 });
    return NextResponse.json({ id: order.id, approveUrl: approve });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
