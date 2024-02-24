"use client";
import React, { useEffect, useState } from "react";

interface Props {
  id:string;
  service: object;
  selected: boolean;
  email: string
}
const FreeTierService = ({ service, selected,id }) => {
  console.log(service);
  const [sName, setSName] = useState(service.sName);
  const [category, setCategory] = useState(service.category);
  const [location, setLocation] = useState(service.location);
  const [displayPicture, setDisplayPicture] = useState(service.displayPicture);
  const [parameters, setParameters] = useState(service.parameters);

  
  useEffect(() => {
    let data = {sName:sName,category,location,displayPicture,parameters,id}
    fetch("http://localhost:3000/api/editService",{
      method:'POST',
      body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((result) => {
      console.log(result.success)
    })
    .catch((error) => console.error(error));
  }, [selected]);

  return (
    <div>
      {sName}
      
      <form className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
        {/* <!-- card body --> */}

        <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
          <div className="flex flex-wrap mb-6 xl:flex-nowrap">
            <div className="mb-5 mr-5">
              <div className="relative inline-block shrink-0 rounded-2xl">
                <img
                  className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                  src={displayPicture}
                  alt="image"
                />
                <div className="group/tooltip relative">
                  <span className="w-[15px] h-[15px] absolute bg-success rounded-full bottom-0 end-0 -mb-1 -mr-2  border border-white"></span>
                  <span className="text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform bg-white rounded-2xl shadow-sm bottom-0 -mb-2 start-full ml-4 font-medium text-secondary-inverse group-hover/tooltip:opacity-100 opacity-0 block">
                    {" "}
                    Status: Active{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-wrap items-start justify-between mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      id="name"
                      className={selected ? "editOn" : "editOff"}
                      defaultValue={sName}
                      onChange={(e) => setSName(e.target.value)}
                      disabled={!selected}
                      required
                    />
                  </div>
                  <div className="flex flex-wrap pr-2 mb-4 font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <select
                      id="categories"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {/* {category.map((cat: string) => {
                      <option selected>{cat}</option>;
                    })} */}
                    </select>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={!selected}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FreeTierService;
