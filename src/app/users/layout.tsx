import Sidebar from "@/components/Users/Sidebar";
import React from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = async ({ children }: UserLayoutProps) => {
  return (
    <Sidebar>
      <div className="h-full" >{children}</div>
    </Sidebar>
  );
};

export default UserLayout;
