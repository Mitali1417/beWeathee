import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Link from "next/link";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "beWealthee",
  description: "Your Personal Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning className="dark">
        <head>
          {/* <link rel="icon" href="/logo-sm.png" sizes="any" /> */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={`${inter.className}`} suppressHydrationWarning>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="pb-6 pt-8 border-t border mt-6">
            <div className="container mx-auto px-4 text-sm text-center text-gray-600 space-y-1">
              <p className="text-sm">
                beWealthee © {new Date().getFullYear()}. All rights reserved.
              </p>
              <p>
                Made by{" "}
                <span className=" hover:underline">
                  <Link href="http://mitali.vercel.app/">Mitali</Link>
                </span>{" "}
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
