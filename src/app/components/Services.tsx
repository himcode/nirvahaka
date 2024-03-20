"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  userId: string;
}

const Services: React.FC<Props> = ({ userId }) => {
  let result: any;
  const [servicess, setServicess] = useState([]);
  useEffect(() => {
    getServices();
  }, []);
  const getServices = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const match = {
      userId: userId
    }

    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}getServices`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({match,skip:0,limit:0,sType:"serviceUser"}),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setServicess(result.result);
      })
      .catch((error) => console.error(error));
  };
  const handleRemoveService = async (s: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}removeService`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId: s }),
        // next: { revalidate: false | 0 | number },
      });

      const result = await response.json();

      if (result.success) {
        getServices()
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col m-[20px] items-center">
      <Link href="/profile/addService">
    <button
      type="button"
      className="focus:outline-none text-white p5 m5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Add Service
    </button>
  </Link>
      {servicess.map((s: any) => {
        return (
          <li key={s.serviceId} className="m-[20px]">
            <Link href={`/profile/${s.serviceId}`} >{s.sName}</Link>
            <button
              onClick={() => handleRemoveService(s.serviceId)}
              className="bg-blue-500 p5 m-[10px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Remove Service
            </button>
          </li>
        );
        // return <FreeTierService service={s} selected={selected} email={email}></FreeTierService>
      })}
    </div>
  );
};

export default Services;
