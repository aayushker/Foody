import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

const metadata: Metadata = {
  title: "Foody",
  description: "A recipe sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
