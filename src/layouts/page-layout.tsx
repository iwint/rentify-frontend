import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "@/components/modals/register-modal";
import RentModal from "@/components/modals/rental-modal";
import Navbar from "@/components/navbar/navbar";
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <RegisterModal />
      <RentModal />
      <LoginModal />
      <Navbar />
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
};

export default PageLayout;
