import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "SLACK CLONE",
  description: "NEXT APPLICATION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
