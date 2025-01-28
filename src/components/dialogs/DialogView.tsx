import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./dialog.css";
import { UniversalContext } from "../generalLayout/GeneralLayout";
import { universalContextType } from "@/utils/types/universalData";
import DialogAdminAccSearch from "./admin-acc-search/Dialog-admin-acc-search";

const DialogView = () => {
  const { universalData, setUniversalData } = useContext(
    UniversalContext
  ) as universalContextType;

  return (
    <>
      <AnimatePresence>
        {universalData.dialog.isVisible && (
          <motion.section
            className="dialog-view"
            variants={{
              show: {
                opacity: 1,
                /* transition: {
                  delay: 0.01,
                }, */
              },
              hide: {
                opacity: 0,
                /* transition: {
                  delay: 1,
                }, */
              },
            }}
            initial="hide"
            animate="show"
            exit="hide"
          >
            <motion.div
              className="dialog-box"
              variants={{
                hide: {
                  scale: 0,
                },
                show: {
                  scale: 1,
                },
              }}
              initial="hide"
              animate="show"
              exit="hide"
              onClick={() =>
                setUniversalData({
                  ...universalData,
                  dialog: {
                    ...universalData.dialog,
                    isVisible: false,
                    dialogType: "NONE",
                  },
                })
              }
            >
              {universalData.dialog.dialogType === "ADMIN_ACC_SEARCH" ? (
                <DialogAdminAccSearch />
              ) : universalData.dialog.dialogType === "ADMIN_ACC_VER" ? (
                <h1>Search Account</h1>
              ) : null}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default DialogView;
