import React, { ReactNode } from "react";
import NavBar from "../components/NavBar";
import StarField from "../components/StarField";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="z-10 relative">
        {children}
      </div>
      {/* Animated star field background */}
      <StarField />
    </>
  );
};

export default Layout;
