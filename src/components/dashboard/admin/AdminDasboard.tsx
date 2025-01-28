"use client";
import { UniversalContext } from "@/components/generalLayout/GeneralLayout";
import { fetchAdmin, handleAdminResponse } from "@/utils/admin";
import { resObject } from "@/utils/types/resObject";
import { universalContextType } from "@/utils/types/universalData";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

const AdminDasboard = ({ res }: { res: object }) => {
  const { universalData, setUniversalData } = useContext(
    UniversalContext
  ) as universalContextType;

  const router = useRouter();
  const [resData, setResData] = useState<object>({});

  useEffect(() => {
    handleAdminResponse(res as resObject, setResData, router);
  }, []);

  const dynamicSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
  };
  return (
    <>
      <h1>Admins Only</h1>
      <p>{JSON.stringify(resData)}</p>
      <h2>Accounts</h2>
      <input type="text" placeholder="Email OR ID" onChange={dynamicSearch} />
      <button>Search</button>
      <br />
      <button
        onClick={() => {
          setUniversalData({
            ...universalData,
            dialog: {
              ...universalData.dialog,
              isVisible: true,
              dialogType: "ADMIN_ACC_SEARCH",
            },
          });
        }}
      >
        Dialog
      </button>
    </>
  );
};

export default AdminDasboard;
