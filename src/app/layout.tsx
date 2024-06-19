import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import "./globals.css"
import { Toaster } from "sonner"
import QueryProvider from "@/providers/QueryProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swarmitch",
  description: "Your favourite streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>
            <Toaster
              theme="light"
              position="bottom-center"
            />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
