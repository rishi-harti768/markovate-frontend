"use client";
import { fetchAdmin, handleAdminResponse } from "@/utils/admin";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9876/admin");

const AdminDasboard = () => {
  const router = useRouter();
  const [resData, setResData] = useState<object>({});

  useEffect(() => {
    const init = async () => {
      /* const res = await fetchAdmin("/admin/get-dashboard", {});
      console.log(res);
      handleAdminResponse(res, router, setResData); */
    };
    init();
    socket.on("result", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const dynamicSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    socket.emit("search", query);
  };
  return (
    <>
      <h1>Admins Only</h1>
      <h2>Accounts</h2>
      <input type="text" placeholder="Email OR ID" onChange={dynamicSearch} />
      <button
        onClick={() => {
          socket.emit("message", "rishie");
        }}
      >
        Search
      </button>
    </>
  );
};

export default AdminDasboard;
