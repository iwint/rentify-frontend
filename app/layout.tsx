import ClientOnly from "@components/ClientOnly";
import Navbar from "@components/navbar/Navbar";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ToasterProvider from "providers/ToasterProvider";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

//Modals
import RegisterModal from "@components/modals/RegisterModal";
import LoginModal from "@components/modals/LoginModal";
import RentModal from "@components/modals/RentModal";

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
  const clientId =
    "748501748744-8qk3prgr8bd9rasi26t5t212rqki4lsa.apps.googleusercontent.com";
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <GoogleOAuthProvider clientId={clientId}>
            <ToasterProvider />
            <RegisterModal />
            <RentModal />
            <LoginModal />
            <Navbar />
          </GoogleOAuthProvider>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
