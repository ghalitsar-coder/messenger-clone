import React from "react";
import AuthSocialButton from "../AuthSocialButton";

const SocialSignIn = () => {
  return (
    <div className="grid gap-y-6 my-6">
      <div className="  grid items-center grid-cols-[1fr,auto,1fr] gap-x-1.5 ">
        <div className="bg-gray-300 h-[1px] " />
        <h3 className="text-sm text-slate-500">Or continue with</h3>
        <div className="  bg-gray-300 h-[1px] " />
      </div>
      <AuthSocialButton />
    </div>
  );
};

export default SocialSignIn;
