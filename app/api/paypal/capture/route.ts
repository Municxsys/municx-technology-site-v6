import { NextRequest, NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";
import { sendLicenseEmail } from "@/lib/mailer";
import { generateLicense } from "@/lib/license";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: "orderId missing" }, { status: 400 });

    const captured = await captureOrder(orderId);
    const tier = captured?.purchase_units?.[0]?.custom_id as "LITE"|"PRO"|"ENT"|undefined;
    const email = captured?.payer?.email_address as string | undefined;

    if (tier && email) {
      const key = generateLicense(tier);
      const dl = tier === "LITE" ? (process.env.DOWNLOAD_URL_LITE as string)
        : tier === "PRO" ? (process.env.DOWNLOAD_URL_PRO as string)
        : (process.env.DOWNLOAD_URL_ENT as string);
      const url = dl || "https://municxsystems.com/downloads/placeholder.zip";
      await sendLicenseEmail(email, tier, key, url);
    }

    return NextResponse.json({ ok: true, captured });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
