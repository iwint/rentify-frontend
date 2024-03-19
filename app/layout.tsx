import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@components/navbar/Navbar";
import ClientOnly from "@components/ClientOnly";
import Modal from "@components/modals/Modal";

export const metadata: Metadata = {
  title: "Red hotel Booking App",
  description: "Book your hotel",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Modal isOpen={true} title="title" />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
