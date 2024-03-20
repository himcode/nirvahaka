
import React from "react";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import "../profile.css";
import Services from "@/app/components/Services";

const manageService = async () => {
  const token: RequestCookie | undefined = cookies().get("token");

  const user: any = jwt.verify(token.value, process.env.JWT_KEY);
  
  
  
  
  
  return <Services userId={user.userId}></Services>;
};

export default manageService;
