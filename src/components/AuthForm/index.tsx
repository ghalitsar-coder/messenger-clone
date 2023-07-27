"use client";

import React, { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import TextField from "../CUSTOM/TextField";
import { PAGE_AUTH, defaultValues, fieldFormData } from "./constants";
import { Button } from "../ui/button";
import FormFields from "./FormFields";
import AuthSocialButton from "./AuthSocialButton";

function AuthForm() {
  const [page, setPage] = useState<PAGE_AUTH>("LOGIN");

  const togglePage = useCallback(() => {
    if (page === "LOGIN") {
      setPage("REGISTER");
    } else {
      setPage("LOGIN");
    }
  }, [page]);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isValid },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(`THIS IS   data:`, data);
    // setIsLoading(true);
    if (page === "REGISTER") {
      // TODO: axios register
    }
    if (page === "LOGIN") {
      // TODO: axios login
    }
  };

  const socialAction = (action: string) => {
    // setIsLoading(true);
    // * NextAuth Social Sign-in
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-10">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 ">
        {/* <h1 className="text-center text-lg font-semibold mt-2 mb-4">{page}</h1> */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormFields page={page} register={register} errors={errors} />
          <Button className="w-full" variant={"messanger"} type="submit">
            {page === "LOGIN" ? "Sign up" : "Sign in"}
          </Button>
        </form>
        <div className="grid gap-y-6 my-6">
          <div className="  grid items-center grid-cols-[1fr,auto,1fr] gap-x-1.5 ">
            <div className="bg-gray-300 h-[1px] " />
            <h3 className="text-sm text-slate-500">Or continue with</h3>
            <div className="  bg-gray-300 h-[1px] " />
          </div>
          <AuthSocialButton />
        </div>

        <div className="flex justify-center items-center  ">
          <h3 className=" text-sm text-gray-500">
            {page === "LOGIN"
              ? "New to Messenger ?"
              : "Already has an account"}
          </h3>
          <Button
            className="text-gray-500 text-sm "
            variant={"link"}
            onClick={() => {
              setPage((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
            }}
          >
            {page === "LOGIN" ? "Create an account" : "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
