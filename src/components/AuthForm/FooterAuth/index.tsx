import { Button } from "@/components/ui/button";
import React from "react";
import { PAGE_AUTH } from "../constants";

interface IFooterAuth {
  page: PAGE_AUTH;
  setPage: React.Dispatch<React.SetStateAction<PAGE_AUTH>>;
}

const FooterAuth = ({ page, setPage }: IFooterAuth) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-1  ">
      <h3 className=" text-sm text-gray-500 ">
        {page === "LOGIN" ? "New to Messenger ?" : "Already has an account"}
      </h3>
      <Button
        className="text-gray-500 text-sm px-1 "
        variant={"link"}
        onClick={() => {
          setPage((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
        }}
      >
        {page === "LOGIN" ? "Create an account" : "Sign in"}
      </Button>
    </div>
  );
};

export default FooterAuth;
