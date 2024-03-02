import FreeTierService from "@/app/components/FreeTierService";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'  

export default async function  Page({ params }: { params: { slug: string } }) {
  
  const token: RequestCookie | undefined = cookies().get("token");

  const user: any = jwt.verify(token.value, process.env.JWT_KEY);

  let service;
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
        selected={true}
        id={params.slug}
        type="edit"
      ></FreeTierService>
    </div>
  );
}
