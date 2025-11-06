"use client";
import Container from "@/components/Container";
import TierCard from "@/components/TierCard";
import PayPalBuyButton from "@/components/PayPalBuyButton";
import { useEffect, useState } from "react";

export default function SuitePage() {
  const [status, setStatus] = useState<string|undefined>();

  useEffect(() => {
    const url = new URL(window.location.href);
    const success = url.searchParams.get("paypal");
    const token = url.searchParams.get("token");
    if (success === "success" && token) {
      (async () => {
        const res = await fetch("/api/paypal/capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: token }),
        });
        if (res.ok) setStatus("Payment confirmed. Your license will be sent via email.");
        else setStatus("Confirmation error. Please contact support.");
      })();
    } else if (success === "canceled") {
      setStatus("Checkout canceled.");
    }
  }, []);

  return (
    <Container>
      <header className="mt-12">
        <h1 className="text-3xl font-semibold">Municx Suite</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          A modular suite for analysis, visualization and workflows. Three tiers — Lite for exploration, Pro for teams, Enterprise for regulated environments.
        </p>
        {status && <p className="mt-3 text-sm text-white/70">{status}</p>}
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <TierCard
          name="Lite"
          subtitle="Solo, learning, demo"
          price="€ 29 one-time"
          features={["Core functions & viewer", "Basic export (CSV/PNG)", "1 device, non-commercial"]}
          cta={<PayPalBuyButton tier="LITE" label="Buy with PayPal" />}
        />
        <TierCard
          name="Pro"
          subtitle="Teams & research"
          price="€ 199 / year per user"
          features={["All Lite features", "Pro modules (batch, reports)", "Commercial usage", "Prioritized support"]}
          cta={<PayPalBuyButton tier="PRO" label="License Pro" />}
        />
        <TierCard
          name="Enterprise"
          subtitle="Regulated environments"
          price="Custom"
          features={["All Pro features", "On-prem / air-gap deployments", "SLA, audits, roles & permissions", "Custom modules & integrations"]}
          cta={<PayPalBuyButton tier="ENT" label="Close Enterprise deal" />}
        />
      </section>

      <p className="mt-6 text-sm text-white/60">
        After successful payment, the license key and download link are sent automatically via email.
      </p>
    </Container>
  );
}
