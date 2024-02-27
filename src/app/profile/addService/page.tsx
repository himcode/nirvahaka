
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import React from "react";
import jwt from "jsonwebtoken";
import FreeTierService from "@/app/components/FreeTierService";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";

const addService = () => {
  const token: RequestCookie | undefined = cookies().get("token");

  const user: any = jwt.verify(token.value, process.env.JWT_KEY);
  // const [selected, setSelected] = React.useState(false);

  const s = {
    sName: "",
    category: "",
    location: "",
    displayPicture: "",
    parameters: [],
  };

  return (
    <>
    {/* {selected? "Save":"Edit"}
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      >
        <CheckIcon />
      </ToggleButton> */}
      <FreeTierService service={s} serviceProviderId={user.serviceProviderId} selected={true} type={"add"}></FreeTierService>
    </>
  );
};

export default addService;
