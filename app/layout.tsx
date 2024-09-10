import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk} from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({
    subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amazon Price Tracker",
  description: "Track the price of products on Amazon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <main className='max-w-10xl mx-auto'>
          <Navbar/>
          {children}
      </main>
      </body>
    </html>
  );
}
