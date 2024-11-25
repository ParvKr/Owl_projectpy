import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OWL",
  description: "Track product prices effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <main className="max-w-10xl mx-auto">
            <Navbar />
            {children}
          </main>
        </body>
      </ClerkProvider>
    </html>
  );
}
