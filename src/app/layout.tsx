import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "SIRUNTU' — Creative Exploration",
  description: "SIRUNTU' Creative Exploration is a creative team for wedding documentation, brand strategy, packaging storytelling, and long-form documentary work.",

  openGraph: {
    title: "SIRUNTU' — Creative Exploration",
    description: "SIRUNTU' Creative Exploration is a creative team for wedding documentation, brand strategy, packaging storytelling, and long-form documentary work.",
    url: "https://siruntu.vercel.app",
    siteName: "SIRUNTU'",
    images: [
      {
        url: `https://siruntu.vercel.app/img/${encodeURIComponent("ᨔᨗᨑᨘᨊᨈᨘᨀ (3).png")}`,
        width: 1080,
        height: 1080,
        alt: "SIRUNTU' Creative Exploration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-text">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
