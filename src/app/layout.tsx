import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/query-provider";
import ScrollToTop from "@/components/scroll-to-top";

export const metadata: Metadata = {
  title: "Masashi Kawakami's Blog",
  description:
    "Masahi Kawakami です。趣味はNFL観戦（LA Ramsファン）、アメコミ、ゲーム、プログラミング、イラストです。色々と記事を投稿して行こうと思います。アメコミやイラストの紹介が多くなりそうな予感です。よろしくお願いします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <div className="min-h-screen bg-background flex flex-col">
              <Header />

              <div className="container mx-auto px-4 py-8 flex-1">{children}</div>
              <Footer />
              <ScrollToTop />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
