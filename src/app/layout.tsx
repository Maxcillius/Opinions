import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/global.css'
import Navbar from "@/components/navBar";
import Providers from "@/components/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Something",
  description: "This something app does something",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-500">
        <Providers>
          <Navbar/>
          {children}          
        </Providers>
        </body>
    </html>
  );
}
