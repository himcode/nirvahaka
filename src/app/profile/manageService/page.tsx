import FreeTierService from '@/app/components/FreeTierService';
import React from 'react';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import '../profile.css'

const manageService = async () => {

    const token: RequestCookie | undefined = cookies().get("token");

    const user: any = jwt.verify(token.value, process.env.JWT_KEY);
    let result: any;
    try {
        const response = await fetch("http://localhost:3000/api/getService", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
          // next: { revalidate: false | 0 | number },
        });
    
        result = await response.json();
      } catch (error) {
        console.error("Error:", error);
      }


  return (
    <div>
      
        <FreeTierService service={result.result} selected={true} email={user.email}></FreeTierService>
    </div>
  )
}

export default manageService