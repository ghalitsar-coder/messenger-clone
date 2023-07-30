import Image from "next/image";
import React from "react";
import { PAGE_AUTH } from "../constants";

interface HeaderAuthProps {
  page: PAGE_AUTH;
}

const HeaderAuth = (props: HeaderAuthProps) => {
  const { page } = props;
  return (
    <figure className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image
        alt="messenger-icon"
        height="48"
        width="48"
        className="mx-auto w-auto"
        src="/images/logo1.png"
      />
      <figcaption className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {page === "LOGIN" ? "Sign in to your account" : "Create an account"}
      </figcaption>
    </figure>
  );
};

export default HeaderAuth;
