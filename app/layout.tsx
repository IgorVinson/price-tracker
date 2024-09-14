import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Navbar from "../components/Navbar";
import SessionProvider from "../libs/SesionProvider";
import { getServerSession } from "next-auth";
import { Providers } from "./providers";

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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    return (
        <html lang="en">
            <body>
                <Theme>
                    <SessionProvider session={session}>
                        <Providers>
                            <main className="max-w-10xl mx-auto">
                                <Navbar />
                                {children}
                            </main>
                        </Providers>
                    </SessionProvider>
                </Theme>
            </body>
        </html>
    );
}
