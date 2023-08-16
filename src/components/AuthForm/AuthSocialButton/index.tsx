import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

const AuthSocialButton = () => {
  const socialAction = (action: string) => {
    // setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success(`Success sign in with ${action}`);
        }
      })
      .catch((err) => {
        toast.error(`Login with ${action} is failed `);
      });
  };
  return (
    <div className=" grid grid-cols-[1fr,1fr] gap-x-2   ">
      <Button onClick={() => socialAction("github")} variant="outline">
        {" "}
        <BsGithub />{" "}
      </Button>
      <Button onClick={() => socialAction("google")} variant="outline">
        {" "}
        <BsGoogle />{" "}
      </Button>
    </div>
  );
};

export default AuthSocialButton;
