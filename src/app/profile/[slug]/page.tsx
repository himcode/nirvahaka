import FreeTierService from "@/app/components/FreeTierService";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Tier1Service from "@/app/components/Tier1Service";

export default async function Page({ params }: { params: { slug: string } }) {
  const token: RequestCookie | undefined = cookies().get("token");

  const user: any = jwt.verify(token.value, process.env.JWT_KEY);

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

      serviceUserId = result.userId;
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
        <Tier1Service
          service={service}
          selected={true}
          id={params.slug}
          type="view"
          serviceUserId={serviceUserId}
        ></Tier1Service>
      )}
    </div>
  );
}
