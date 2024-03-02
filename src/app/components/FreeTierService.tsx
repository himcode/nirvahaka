"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckIcon from "@mui/icons-material/Check";
import { MdDelete } from "react-icons/md";
import ToggleButton from "@mui/material/ToggleButton";

type Pair = {
  key: string;
  value: string;
};
interface Props {
  id: string;
  service: object;
  selected: boolean;
  type: string;
}

const FreeTierService: React.FC<Props> = ({ service, selected, id, type }) => {
  // console.log(service);
  const router = useRouter();
  const [sName, setSName] = useState(service.sName);
  const [category, setCategory] = useState(service.category);
  const [location, setLocation] = useState(service.location);
  const [displayPicture, setDisplayPicture] = useState(service.displayPicture);
  const [parameters, setParameters] = useState<Pair[]>([]);
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [pairs, setPairs] = useState<Pair[]>([...service.parameters]);
  const [s, setS] = React.useState(selected);
  const handleParameterRemove = (index: number) => {
    const newPairs = [...pairs];
    newPairs.splice(index, 1);
    setPairs(newPairs);
    setParameters(newPairs);
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setPairs([...pairs, { key, value }]);
    setParameters([...pairs, { key, value }]);
    console.log(pairs);
    setKey("");
    setValue("");
  };

  const saveService = (event: FormEvent) => {
    event.preventDefault();
    let data = {
      sName: sName,
      category,
      location,
      displayPicture,
      parameters,
      serviceProviderId: id,
    };
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}addService`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        router.push("/profile/manageService");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log(parameters)
    if(!s){

      let data = {
        sName: sName,
        category,
        location,
        displayPicture,
        parameters,
        serviceId: id,
      };
      console.log(data);
      fetch(`${process.env.NEXT_PUBLIC_HOST_URL}editService`, {
      method: "POST",
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error(error));
  }
  }, [s]);

  return (
    <form
      onSubmit={saveService}
      className="grid justify-items-center text-black"
    >
      <div className="flex flex-row p-4 w-4/5 bg-white">
        <div id="displayPicture" className="w-1/5 ml-[150px]">
          <div className="flex items-center flex-col space-x-6">
            <div className="shrink-0">
              <img
                className="h-24 w-24 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
              />
            </label>
          </div>
        </div>
        <div id="container_for_Details" className="w-2/5 flex flex-col p-4">
          <input
            type="text"
            id="sName"
            defaultValue={sName}
            className="font-extrabold text-xl"
            onChange={(e) => setSName(e.target.value)}
            disabled={!selected}
            placeholder="Service Name"
            required
          />
          {/* TODO- Change category input to select style */}
          <input
            type="text"
            id="category"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!selected}
            placeholder="Category"
          />
          <input
            type="text"
            className="mt-[50px]"
            id="location"
            defaultValue={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={!selected}
            placeholder="Location"
          />
        </div>
      </div>
      <div
        id="parameters"
        className="flex flex-col w-3/5 bg-slate-500 p-10 items-center "
      >
        <ul>
          {pairs.map((pair, index) => (
            <li key={index}>
              {pair.key}: {pair.value}
              <button onClick={() => handleParameterRemove(index)}>
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
        {
          selected && (
            // <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Key"
                value={key}
                className="text-black"
                onChange={(e) => setKey(e.target.value)}
              />
              <input
                type="text"
                placeholder="Value"
                className="text-black"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={handleSubmit} type="submit">
                Submit
              </button>
            </div>
          )
          // </form>
        }
      </div>
      {type === "add" ? (
        <button type="submit" className="text-white">
          Save
        </button>
      ) : (
        <div className="text-white">
          <ToggleButton
            value="check"
            selected={s}
            onChange={() => {
              setS(!s);
            }}
          >
            <CheckIcon />
          </ToggleButton>
          {s ? "Save" : "Edit"}
        </div>
      )}
    </form>
  );
};

export default FreeTierService;
