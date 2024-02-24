import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import React from "react";
import jwt from "jsonwebtoken";
import FreeTierService from "@/app/components/FreeTierService";

const addService = () => {
  const token: RequestCookie | undefined = cookies().get("token");

  const user: any = jwt.verify(token.value, process.env.JWT_KEY);
  const selected = true;

  const s = {
    sName: "",
    category: "",
    location: "",
    displayPicture: "",
    parameters: {},
  };

  return (
    <>
      <FreeTierService service={s} id={user.serviceProviderId} selected={selected}></FreeTierService>
    </>
  );
};

export default addService;
