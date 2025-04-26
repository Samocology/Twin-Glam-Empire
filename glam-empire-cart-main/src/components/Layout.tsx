
import { ReactNode } from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/reset-password";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <Footer />
      {!isAuthPage && <BottomNavBar />}
      <div className="h-16">
        {/* Spacer to prevent content from being hidden behind the bottom navbar */}
      </div>
    </div>
  );
};

export default Layout;
