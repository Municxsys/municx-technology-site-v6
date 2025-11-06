"use client";
export default function PayPalBuyButton({ tier, label }: { tier: "LITE"|"PRO"|"ENT"; label: string }) {
  async function start() {
    const res = await fetch("/api/paypal/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tier }) });
    const data = await res.json();
    if (data.approveUrl) window.location.href = data.approveUrl;
    else alert("Error starting PayPal checkout");
  }
  return <button onClick={start} className="btn-primary">{label}</button>;
}
