import Link from "next/link";
import Container from "@/components/Container";
import HeroAurora from "@/components/HeroAurora";
export default function Page(){
  return (
    <Container>
      <section className="mt-16 grid gap-8">
        <HeroAurora>
          <div className="p-10 md:p-16 text-center">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Municx Technology — <span className="bg-clip-text text-transparent" style={{backgroundImage:'linear-gradient(90deg,#e6f2ff,#00e0ff)'}}>Where Quantum Meets Human Design</span>
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-white/70">
              Dark tech design. Precise software. A suite for real research, teams and enterprise environments.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/products/municx-suite" className="btn-primary">Explore the Suite</Link>
              <Link href="/vision" className="btn-ghost">Read the Vision</Link>
            </div>
          </div>
        </HeroAurora>
      </section>
    </Container>
  );
}
