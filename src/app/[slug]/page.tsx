// "use client";
import FreeTierService from "@/app/components/FreeTierService";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Tier1Service from "../components/Tier1Service";

import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
export default async function Page({ params }: { params: { slug: string } }) {
  let user: any;

  let token: RequestCookie | undefined = cookies().get("token");
  if (token?.value.length) {
    user = jwt.verify(token.value, process.env.JWT_KEY);
  }


  let service;
  let serviceUserId;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}getService`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId: params.slug }),
        // next: { revalidate: false | 0 | number },
      }
    );

    const result = await response.json();

    if (result.success) {
      service = result.result;
      serviceUserId = result.result.userId
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return (
    <div>
        {service.tier === "free" ? (
        <FreeTierService
        service={service}
          selected={true}
          id={params.slug}
          type="view"
        ></FreeTierService>
      ) : (
        user ? (          
          <Tier1Service
          service={service}
          selected={true}
          id={params.slug}
          serviceUserId={serviceUserId}
          type="view"
          userId={user.userId}
          ></Tier1Service>
        ) : (
          <Tier1Service
          service={service}
          selected={true}
          id={params.slug}
          serviceUserId={serviceUserId}
          type="view"
          ></Tier1Service>
        )
        
        )}
      
    </div>
  );
}
