import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";



const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Tom's Blog",
  description: "About my journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-screen-lg mx-auto px-5 md:px-8 py-8">
          {children}
        </main>
        <footer className="">
          <Footer />
        </footer>
      </div>
      </body>
    </html>
  );
}
