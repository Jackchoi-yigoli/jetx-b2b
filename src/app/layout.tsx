import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { getLocale, getMessages } from 'next-intl/server';
import { Providers } from './providers';
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JetX B2B Platform",
  description: "Professional car wash management platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('jetx-theme')||'light';document.documentElement.setAttribute('data-theme',t)})();`,
          }}
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
