"use client";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import NormalUserEditProfileForm from "../components/NormalUserEditProfileForm";
import ServiceUserEditProfileForm from "../components/ServiceUserEditProfileForm";
import { useAppSelector } from "../redux/store";

interface Props {
  id:string;
  user: any;
  profileType: string;
}

const EditProfle: React.FC<Props> = ({ id,user,profileType }) => {
  const [selected, setSelected] = React.useState(false);
  console.log(profileType,user,id)
  
  const userInfo = useAppSelector((state) => state.user);
  console.log(userInfo)

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
      {profileType == "normal" ? (
        <NormalUserEditProfileForm selected={selected} id={id} user={user} />
      ) : (
        <ServiceUserEditProfileForm user={user} id={id} selected={selected} />
      )}
    </div>
  );
};

export default EditProfle;
