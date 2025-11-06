"use client";
import { useEffect, useRef } from "react";
export default function HeroAurora({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;const ctx=c.getContext('2d');if(!ctx)return;
    const dpr=Math.max(1,window.devicePixelRatio||1);
    const resize=()=>{const r=c.getBoundingClientRect();c.width=Math.floor(r.width*dpr);c.height=Math.floor(r.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);};
    resize();window.addEventListener('resize',resize);
    let a=0, raf=0;
  const wave = (
  yb: number,
  amp: number,
  freq: number,
  ph: number,
  col: string,
  al: number
) => {
const r=c.getBoundingClientRect(),w=r.width,h=r.height;ctx.save();ctx.globalAlpha=al;ctx.beginPath();for(let x=0;x<=w;x+=2){const y=yb+Math.sin((x*freq)+ph)*amp; if(x===0)ctx.moveTo(x,y); else ctx.lineTo(x,y);}ctx.strokeStyle=col;ctx.lineWidth=2;ctx.stroke();ctx.restore();};
    const loop=()=>{const r=c.getBoundingClientRect(),w=r.width,h=r.height;ctx.clearRect(0,0,w,h);const g=ctx.createRadialGradient(w*0.7,-h*0.1,0,w*0.7,-h*0.1,Math.max(w,h));g.addColorStop(0,'rgba(0,224,255,0.08)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);const t=a*0.016;wave(h*0.45,22,0.015,t*2.1,'#00e0ff',0.9);wave(h*0.50,28,0.010,t*1.6,'rgba(0,224,255,0.6)',0.7);wave(h*0.55,18,0.020,t*2.7,'rgba(164,66,255,0.35)',0.6);wave(h*0.60,12,0.024,t*3.1,'rgba(255,255,255,0.25)',0.5);a+=1;raf=requestAnimationFrame(loop);};raf=requestAnimationFrame(loop);return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};},[]);
  return (<div className="relative overflow-hidden rounded-2xl border border-white/10"><canvas ref={ref} className="absolute inset-0 w-full h-full"/><div className="relative z-10">{children}</div><div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10"/></div>);
}
