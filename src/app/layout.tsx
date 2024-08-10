"use client";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/themeProvider";
import ProgressBarProviders from "@/providers/progressBarProvider";
import { RecoilRoot } from "recoil";

const space = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={space.className}>
          <RecoilRoot>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ProgressBarProviders>{children}</ProgressBarProviders>
            </ThemeProvider>
          </RecoilRoot>
        </body>
      </html>
    </ClerkProvider>
  );
}
