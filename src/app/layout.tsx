import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blackstone CRM - Construction Project Management",
  description: "Construction industry CRM and project management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
