import { useContext } from "react";

import { UniversalContext } from "@/components/generalLayout/GeneralLayout";
import { universalContextType } from "@/utils/types/universalData";

import "./style.css";
const DialogAdminAccSearch = () => {
  const { universalData, setUniversalData } = useContext(
    UniversalContext
  ) as universalContextType;

  return (
    <>
      <div
        className="dialog-container"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Rishi
      </div>
    </>
  );
};

export default DialogAdminAccSearch;
