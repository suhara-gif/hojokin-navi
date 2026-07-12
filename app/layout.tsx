import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export const metadata: Metadata = {
  title: "補助金ナビ（仮） | jGrants補助金情報検索",
  description: "デジタル庁jGrantsの補助金情報を検索できるサイト。募集中の補助金を一覧表示し、詳細情報を確認できます。",
  openGraph: {
    title: "補助金ナビ（仮） | jGrants補助金情報検索",
    description: "デジタル庁jGrantsの補助金情報を検索できるサイト",
    type: "website",
  },
  verification: {
    google: "doYxRXhaosBxnKa9uiYL6UJ9IooYo_e6sxbMEUjn3yc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {GA4_ID ? (
        <head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `}
          </Script>
        </head>
      ) : null}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
