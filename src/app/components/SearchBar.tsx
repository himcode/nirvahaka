"use client";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  handleSearch: any;
}

const SearchBar: React.FC<Props> = ({ handleSearch }) => {
  const [searchInput, setSearchInput] = useState<string>();
// const [query, setQuery] = useState<string>()
  // const searchList = [
  //   "hello",
  //   "how",
  //   "apple",
  //   "ball",
  //   "call",
  //   "dog",
  //   "elephant",
  // ];
  const [searchList, setSearchList] = useState<String[]>([]);
  // const handleChange = (e) => {
  //   handleSearch(e)
  //   const results = searchList.filter((search) => {
  //     if (e.target.value === "") return searchList;
  //     return search.title.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  //   setSearchList({
  //     query: e.target.value,
  //     list: results,
  //   });
  // };
  
  

  useEffect(() => {
    console.log(searchInput)
    getSearch(searchInput)
  }, [searchInput])

  const getSearch: any = async (search: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ search, limit: 5 });

    // console.log(process.env.NEXT_PUBLIC_URL)
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}searchQuery`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.result)
        setSearchList(result.result.map((item:any)=>{
          return item.sName
        }));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Autocomplete
        className="bg-white"
        disablePortal
        freeSolo
        id="combo-box-demo"
        options={searchList}
        sx={{ width: 300 }}
        filterOptions={(x) => x}
        onChange={(e,v)=>handleSearch(v)}
        renderInput={(params) => (
          <TextField
            onChange={(e) => setSearchInput(e.target.value)}
            {...params}
          />
        )}
      />

      {/* <form>
        <input onChange={handleChange} value={searchList.query} type="search" />
      </form>
      <ul>
        {searchList.query === ""
          ? ""
          : searchList.list.map((search) => {
              return <li key={search.title}>{search.title}</li>;
            })}
      </ul> */}
    </div>
  );
};

export default SearchBar;
