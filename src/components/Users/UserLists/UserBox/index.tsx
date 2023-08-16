"use client";

import AvatarComp from "@/components/Avatar";
import useActiveList from "@/utils/hooks/useActiveList";
import { createConversation } from "@/utils/services/users/conversations";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

interface UserBoxProps extends User {}

const UserBox = (props: UserBoxProps) => {
  const { name, email, image, id } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(email as never) !== -1;

  const handleConversation = useCallback(async () => {
    setIsLoading(true);

    await createConversation({
      onSuccess: (res) => {
        router.push(`/conversations/${res.data.id}`);
        router.refresh();
      },
      userId: id,
    });
  }, [id, router]);

  return (
    <button
      onClick={handleConversation}
      className={
        "w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      }
    >
      <AvatarComp imageUrl={image!} fallbackName={name!} isActive={isActive} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{name}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default UserBox;
