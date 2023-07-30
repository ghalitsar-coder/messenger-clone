import EmptyState from "@/components/Users/EmptyState";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Users",
  description: "Messenger Clone",
};

const Users = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full bg-red-300">
      <EmptyState />
    </div>
  );
};

export default Users;
