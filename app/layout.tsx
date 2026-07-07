import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "補助金ナビ（仮） | jGrants補助金情報検索",
  description: "デジタル庁jGrantsの補助金情報を検索できるサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
