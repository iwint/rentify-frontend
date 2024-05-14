import ClientOnly from "@components/client-only";
import Navbar from "@components/navbar/navbar";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ToasterProvider from "providers/toast-provider";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Providers from "providers/query-provider";

//Modals
import RegisterModal from "@components/modals/register-modal";
import LoginModal from "@components/modals/login-modal";
import RentModal from "@components/modals/rental-modal";

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
          <Providers>
            <GoogleOAuthProvider clientId={clientId}>
              <ToasterProvider />
              <RegisterModal />
              <RentModal />
              <LoginModal />
              <Navbar />
            </GoogleOAuthProvider>
          </Providers>
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
