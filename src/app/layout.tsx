import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAG Chat",
  description: "Built by Simeon",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className="w-screen max-h-screen">
        <Nav />
        {children}
      </body>
    </html>
  );
}
