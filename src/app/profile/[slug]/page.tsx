import FreeTierService from "@/app/components/FreeTierService";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'  

export default async function  Page({ params }: { params: { slug: string } }) {
  
  let service

  try {
    const response = await fetch("http://localhost:3000/api/getService", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serviceId : params.slug}),
      // next: { revalidate: false | 0 | number },
    });

    const result = await response.json();

    if (result.success) {
    service=result.result;
    }
  } catch (error) {
    console.error("Error:", error);
  
};
  return (
    <div>
      <FreeTierService
        service={service}
        selected={false}
        id={undefined}
      ></FreeTierService>
    </div>
  );
}
