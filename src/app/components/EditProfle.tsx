"use client";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import NormalUserEditProfileForm from "../components/NormalUserEditProfileForm";
import ServiceUserEditProfileForm from "../components/ServiceUserEditProfileForm";

interface Props {
  user: any;
  userType: string;
}

const EditProfle: React.FC<Props> = ({ user,userType }) => {
  const [selected, setSelected] = React.useState(false);
  
  

  return (
    <div className="container">
      {selected? "Save":"Edit"}
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      >
        <CheckIcon />
      </ToggleButton>
      {userType == "normalUser" ? (
        <NormalUserEditProfileForm selected={selected} user={user} />
      ) : (
        <ServiceUserEditProfileForm user={user} selected={selected} />
      )}
    </div>
  );
};

export default EditProfle;
