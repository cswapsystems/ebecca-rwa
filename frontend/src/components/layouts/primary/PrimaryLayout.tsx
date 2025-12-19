"use client";

import React from "react";
import { useEffect } from "react";
import { Header, Footer } from "@/components/common";

interface PrimaryLayoutProps {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Override the value of "--header-height"
    document.documentElement.style.setProperty("--header-height", "125px");
  }, []);

  return (
    <>
      <header>
        <Header variant="primary" />
      </header>

      <main>
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
};

export default PrimaryLayout;
