"use client";
import { fetchAdmin, handleAdminResponse } from "@/utils/admin";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const AdminDasboard = () => {
  const router = useRouter();
  const [resData, setResData] = useState<object>({});

  useEffect(() => {
    const init = async () => {
      const res = await fetchAdmin("/admin/get-admin-dashboard", {});
      console.log(res);
      handleAdminResponse(res, router, setResData);
    };
    init();
  }, []);

  const dynamicSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
  };
  return (
    <>
      <h1>Admins Only</h1>
      <h2>Accounts</h2>
      <input type="text" placeholder="Email OR ID" onChange={dynamicSearch} />
      <button>Search</button>
    </>
  );
};

export default AdminDasboard;
