"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySidebar from "./CategorySidebar";
import InfiniteScroll from 'react-infinite-scroll-component';

const BrowseServices = () => {
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [servicess, setServicess] = useState<Object[]>([]);
  const [c, setC] = useState("");
  const [l, setL] = useState("");
  const [match, setMatch] = useState({});
const [totalServices, setTotalServices] = useState(0)
const [hasMore, setHasMore] = useState(true)
const [skip, setSkip] = useState(0)
const [limit, setLimit] = useState(5)

  const fetchMoreData = async() => {
    if (servicess.length >= totalServices) {
      setHasMore(false);
      return;
    }
    setSkip(skip+5)
    setTimeout(() => {
    getServices(match,skip,limit)
    // a fake async api call like which sends
    // 20 more records in .5 secs        
    }, 500);
  };













  const getServices: any = async (match: {},skip:number,limit:number) => {
    console.log(skip,match,servicess)    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({match,skip,limit});

    // console.log(process.env.NEXT_PUBLIC_URL)
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}getServices`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setServicess([...servicess,...result.result]);
        console.log(servicess)
        setSkip(skip+5)
        setTotalServices(result.totalServices)
      
      })
      .catch((error) => console.error(error));
  };

  const handleFilter =  async (event:any) =>{
    event.preventDefault()
    setSkip(0)
    setServicess([])
    if(l===""){
      setMatch({category:c})
    }else if(c===""){
      setMatch({location:l})
    }else{
      setMatch({category:c,location:l})
    }
  }
  

  useEffect(() => {
    getServices(match,skip,limit);
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}getFilter`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setCategory(result.category);
        setLocation(result.location);
      })
      .catch((error) => console.error(error));
  }, [match]);

  return (
    <div>
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <form onSubmit={handleFilter} className="max-w-sm mx-auto mt-[70px]">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Location
              </label>
              <select
                id="location"
                defaultValue={l}
                onChange={(e) => setL(e.target.value)}
                className="bg-gray-50 border border-gray-300     text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a Location</option>
                {location.map((i) => {
                  return <option value={i}>{i}</option>;
                })}
              </select>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Category
              </label>
              <select
                defaultValue={c}
                onChange={(e) => setC(e.target.value)}
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a category</option>
                {category.map((i) => {
                  return <option value={i}>{i}</option>;
                })}
              </select>
              <button
                type="submit"
                className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Filter
              </button>
            </form>
          </div>
        </aside>
      </div>
      <InfiniteScroll
          dataLength={servicess.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
      <div className=" grid grid-cols-1 gap-8 p-4 sm:ml-64">

        {servicess.map((s) => {
          return (
            <Link
              href="#"
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
              <img
                className="object-cover w-96 rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={s.displayPicture}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {s.sName}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {s.category}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {s.location}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
        </InfiniteScroll>
    </div>
  );
};

export default BrowseServices;
