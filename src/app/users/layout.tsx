import Sidebar from "@/components/Users/Sidebar";
import UserLists from "@/components/Users/UserLists";
import getUsers from "@/utils/actions/getUsers";
import React from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = async ({ children }: UserLayoutProps) => {
  const users = await getUsers()
  return (
    <Sidebar>
      <div className="h-full" >
        <UserLists users={users} />
        {children}</div>
    </Sidebar>
  );
};

export default UserLayout;
