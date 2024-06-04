import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
  user: any;
  selected: boolean;
}

const NormalUserEditProfileForm: React.FC<Props> = ({ user, id, selected }) => {
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [alternatePhone, setAlternatePhone] = useState(user.alternatePhone);
  const [address, setAddress] = useState(user.address);
  const [pincode, setPincode] = useState(user.address.pincode)
  const [state, setState] = useState(user.address.state)
  const [city, setCity] = useState(user.address.city)
  const [line1, setLine1] = useState(user.address.line1)
  const [line2, setLine2] = useState(user.address.line2)
  
  useEffect(() => {
    let x ={pincode,city,state,line1,line2}
    let data = { userId: id, email, name: fullName, phone, address:x };
    
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}editProfile`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
      })
      .catch((error) => console.error(error));
  }, [selected]);


  useEffect(() => {
    if(pincode.length==6){

      fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
        method: "GET",
      })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setState(result[0].PostOffice[0].State)
      })
      .catch((error) => console.error(error));
    }


  }, [pincode])

  return (
    <div className="container ml-20">
      Normal
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={selected ? "editOn" : "editOff"}
              // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!selected}
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              className={selected ? "editOn" : "editOff"}
              // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!selected}
              required
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              // className={
              //   selected
              //     ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled"
              //     : "border-l selected"
              // }
              className={selected ? "editOn" : "editOff"}
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!selected}
              required
            />
          </div>
          <div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-90"
              >
                Alternate Phone No:
              </label>
              <input
                type="number"
                id="alternatePhoneNo"
                className={selected ? "editOn" : "editOff"}
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
                disabled={!selected}
                required
              />
            </div>
          </div>
        </div>
        <label
          htmlFor="address"
          className="block mb-2 text-sm text-gray-90 font-bold"
        >
          Address
        </label>
        <div className="grid gap-6 mb-6 md:grid-cols-2 border-4 p-4">
          <div>
            <label
              htmlFor="pincode"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              // className={
              //   selected
              //     ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled"
              //     : "border-l selected"
              // }
              className={selected ? "editOn" : "editOff"}
              defaultValue={pincode}
              onChange={(e) => setPincode(e.target.value)}
              disabled={!selected}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              // className={
              //   selected
              //     ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled"
              //     : "border-l selected"
              // }
              className={selected ? "editOn" : "editOff"}
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!selected}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              // className={
              //   selected
              //     ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled"
              //     : "border-l selected"
              // }
              className={selected ? "editOn" : "editOff"}
              defaultValue={state}
              onChange={(e) => setState(e.target.value)}
              disabled={true}
              required
            />
          </div>
          <div>
            <label
              htmlFor="line1"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              Line 1:
            </label>
            <input
              type="text"
              id="line1"
              // className={
              //   selected
              //     ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled"
              //     : "border-l selected"
              // }
              className={selected ? "editOn" : "editOff"}
              defaultValue={line1}
              onChange={(e) => setLine1(e.target.value)}
              disabled={!selected}
              required
            />
          </div> 
          <div>
            <label
              htmlFor="line2"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              Line 2:
            </label>
            <input
              type="text"
              id="line2"
              // className={
              //   selected
              //     ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled"
              //     : "border-l selected"
              // }
              className={selected ? "editOn" : "editOff"}
              defaultValue={line2}
              onChange={(e) => setLine2(e.target.value)}
              disabled={!selected}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NormalUserEditProfileForm;
