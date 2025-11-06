import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata = { title: "Municx Technology — Software Intelligence", description: "Deep-tech software blending science, code, and human design." };
export default function RootLayout({children}:{children:React.ReactNode}){return(<html lang="en"><body><Header/><main className="min-h-[70vh]">{children}</main><Footer/></body></html>);}
