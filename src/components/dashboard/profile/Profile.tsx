"use client";

import { fetchAccount, handleAccResponse } from "@/utils/account";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface resDataObject {
  profile?: {
    first_name?: string;
    last_name?: string;
    gender?: string;
    date_of_birth?: string;
  };
  isProfileSetup?: boolean;
  missingFields?: string[];
  accUpdated?: boolean;
}

const Profile = () => {
  const router = useRouter();
  const [resDataGet, setResDataGet] = useState<resDataObject>({
    profile: {
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
    },
    isProfileSetup: false,
  });

  const [resDataSet, setResDataSet] = useState<resDataObject>({});

  useEffect(() => {
    const init = async () => {
      const res = await fetchAccount("/account/get-my-profile", {});
      console.log(res);
      handleAccResponse(res, router, setResDataGet);
    };
    init();
  }, []);

  useEffect(() => {}, [resDataGet]);

  useEffect(() => {
    console.log(resDataSet);
  }, [resDataSet]);

  const btnchangeprofile = async () => {
    const res = await fetchAccount("/account/set-my-profile", {
      profile: resDataGet.profile,
    });
    handleAccResponse(res, router, setResDataSet);
  };
  return (
    <>
      <div>Profile</div>
      {resDataGet.isProfileSetup && <div>Setup your profile</div>}
      <p>{JSON.stringify(resDataGet)}</p>
      <p>{JSON.stringify(resDataSet)}</p>
      <input
        type="text"
        defaultValue={resDataGet.profile?.first_name}
        onChange={(e) =>
          setResDataGet({
            ...resDataGet,
            profile: { ...resDataGet.profile, first_name: e.target.value },
          })
        }
        placeholder="First Name"
      />
      <input
        type="text"
        defaultValue={resDataGet.profile?.last_name}
        onChange={(e) =>
          setResDataGet({
            ...resDataGet,
            profile: { ...resDataGet.profile, last_name: e.target.value },
          })
        }
        placeholder="Last Name"
      />
      <input
        type="text"
        defaultValue={resDataGet.profile?.gender}
        onChange={(e) =>
          setResDataGet({
            ...resDataGet,
            profile: { ...resDataGet.profile, gender: e.target.value },
          })
        }
        placeholder="Gender"
      />
      <input
        type="text"
        defaultValue={resDataGet.profile?.date_of_birth}
        onChange={(e) =>
          setResDataGet({
            ...resDataGet,
            profile: { ...resDataGet.profile, date_of_birth: e.target.value },
          })
        }
        placeholder="Date of Birth"
      />
      <button onClick={btnchangeprofile}>Change</button>
    </>
  );
};

export default Profile;
/*
 */
