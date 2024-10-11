import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Wrapper } from "@/wrapper";
import { Modals } from "./components/Modals";
export const metadata: Metadata = {
  title: "Slck clone",
  description: "next js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexAuthNextjsServerProvider>
        <body>
          <Wrapper className="">
            <ConvexClientProvider>
              <Modals />
              {children}
            </ConvexClientProvider>
            <Toaster />
          </Wrapper>
        </body>
      </ConvexAuthNextjsServerProvider>
    </html>
  );
}
