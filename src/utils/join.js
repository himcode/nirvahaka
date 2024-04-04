import React from 'react'
import { useState } from 'react';
// import { Link } from 'react-router-dom';
let n
const JOIN = () => {
  const [user, setUser] = useState("");

  n=user
  return (
      <div className="input-group mb-3 my-3 bg-origin-padding">
      <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1">
      @
      </span>
        </div>
        <input
          onChange={(e) => setUser(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          />
          <div className="container border-e-red-100">
          
          <Link to='/test' onClick={(e)=>user.length===0? e.preventDefault() : null}><button>Enter</button></Link>
        </div>
        </div>
  )
};

export default JOIN

export {n}