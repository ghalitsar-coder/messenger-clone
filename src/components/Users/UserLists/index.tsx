import { User } from "@prisma/client";
import React from "react";

interface UserListsProps {
  users: User[];
}

const UserLists = (props: UserListsProps) => {
  const { users } = props;
  return <aside>
     
  </aside>;
};

export default UserLists;
