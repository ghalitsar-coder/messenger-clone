import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface AvatarGroupProps {
  users: User[];
  cvBox?: boolean;
}

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const { users, cvBox } = props;
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0 left-0",
    2: "bottom-0 right-0",
  };
  return (
    <ul
      className={cn("relative   !h-11 ", cvBox ? "!w-14 " : "w-11")}
    >
      {slicedUsers.map((user, idx) => (
        <li
          key={idx}
          className={cn(
            "absolute inline-block  rounded-full overflow-hidden h-[21px] w-[21px]  ",
            positionMap[idx as keyof typeof positionMap]
          )}
        >
          <Image
            src={user?.image ?? "/images/placeholder1.jpg"}
            fill
            alt="avatr"
          />
        </li>
      ))}
    </ul>
  );
};

export default AvatarGroup;
