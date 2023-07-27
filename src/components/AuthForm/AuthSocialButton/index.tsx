import { Button } from "@/components/ui/button";
import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

const AuthSocialButton = () => {
  return (
    <div className=" grid grid-cols-[1fr,1fr] gap-x-2   ">
      <Button variant="outline">
        {" "}
        <BsGithub />{" "}
      </Button>
      <Button variant="outline">
        {" "}
        <BsGoogle />{" "}
      </Button>
    </div>
  );
};

export default AuthSocialButton;
