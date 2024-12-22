import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>
        <Header />
        <article>{children}</article>
        <Footer />
      </main>
    </>
  );
};

export default GeneralLayout;
