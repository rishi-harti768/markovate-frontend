"use client";
import { fetchAccount, handleAccResponse } from "@/utils/account";
import { newOrgReg } from "@/utils/organization";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewOrg = () => {
  const [org, setOrg] = useState({
    org_name: "",
    inst_name: "",
    website: "",
    email: "",
    phone: "",
  });

  const router = useRouter();
  const handleSubmit = async () => {
    console.log(org);
    const res = await fetchAccount("/account/reg-new-org", org);
    console.log(res);
  };
  return (
    <>
      <h1>new Organization</h1>
      <input
        type="text"
        placeholder="Organization name"
        onChange={(e) => setOrg({ ...org, org_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Institution name"
        onChange={(e) => setOrg({ ...org, inst_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Offical Website"
        onChange={(e) => setOrg({ ...org, website: e.target.value })}
      />
      <input
        type="text"
        placeholder="business email"
        onChange={(e) => setOrg({ ...org, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="business phone"
        onChange={(e) => setOrg({ ...org, phone: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default NewOrg;
