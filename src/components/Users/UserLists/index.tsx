import { User } from "@prisma/client";
import React from "react";
import UserBox from "./UserBox";

interface UserListsProps {
  users: User[];
}

const UserLists = (props: UserListsProps) => {
  const { users } = props;
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-hidden border-r block border-gray-200 w-full left-0 ">
      <div className="px-5">
        <div className="flex-col flex">
          <h3 className="text-2xl font-bold text-neutral-800 py-4">People</h3>
        </div>
        <ul className="grid gap-y-2.5">
          {users?.map((user) => (
            <li key={user.id}>
              <UserBox {...user} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default UserLists;
