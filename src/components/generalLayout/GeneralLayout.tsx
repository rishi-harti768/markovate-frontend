"use client";
import React, { createContext, useEffect, useState } from "react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import DialogView from "../dialogs/DialogView";
import LoadingView from "./loader/LoadingView";
import {
  universalContextType,
  universalDataType,
} from "@/utils/types/universalData";

import "./style.css";

const context: universalDataType = {
  dialog: {
    isVisible: false,
    dialogType: "none",
  },
};
export const UniversalContext = createContext<universalContextType | null>(
  null
);

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const [universalData, setUniversalData] =
    useState<universalDataType>(context);
  return (
    <>
      <main>
        <UniversalContext.Provider value={{ universalData, setUniversalData }}>
          {/* <LoadingView /> */}
          {/* <Header /> */}
          <article>{children}</article>
          <Footer />
          <DialogView />
        </UniversalContext.Provider>
      </main>
    </>
  );
};

export default GeneralLayout;
