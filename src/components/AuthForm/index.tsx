"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { PAGE_AUTH, defaultValues, onErrorAuth } from "./constants";
import { Button } from "../ui/button";
import FormFields from "./FormFields";
import { postRegister, postSignIn } from "@/utils/services/auth";
import { useSession } from "next-auth/react";
import FooterAuth from "./FooterAuth";
import HeaderAuth from "./HeaderAuth";
import { useRouter } from "next/navigation";
import SocialSignIn from "./SocialSignIn";

function AuthForm() {
  const [page, setPage] = useState<PAGE_AUTH>("LOGIN");
  const session = useSession();
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors, isLoading, isValid, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newData = {
      data,
      onSuccess: () => {
        router.push("/users");
        clearErrors();
      },
      onError:() => onErrorAuth({ setError, page }),
    };
    if (page === "REGISTER") {
      await postRegister(newData);
    }
    if (page === "LOGIN") {
      await postSignIn(newData);
    }
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status]);

  return (
    <>
      <HeaderAuth page={page} />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-10">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 ">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormFields page={page} register={register} errors={errors} />
            <Button
              disabled={isLoading || !isValid || isSubmitting}
              className="w-full"
              variant={"messanger"}
              type="submit"
              // isLoading
            >
              {page === "LOGIN" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <SocialSignIn />
          <FooterAuth page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
}

export default AuthForm;
