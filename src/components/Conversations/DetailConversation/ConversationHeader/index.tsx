"use client";

import AvatarComp from "@/components/Avatar";
import { cn } from "@/lib/utils";
import { useOtherUser } from "@/utils/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import useProfileDrawer from "@/utils/hooks/useProfileDrawer";
import AvatarGroup from "../../AvatarGroup";
import useActiveList from "@/utils/hooks/useActiveList";

interface ConversationHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConversationHeader: React.FC<ConversationHeaderProps> = (props) => {
  const { conversation } = props;

  const otherUser = useOtherUser(conversation);
  const { isOpen, onOpen } = useProfileDrawer();
  const router = useRouter();
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email as never) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    if (isActive) {
      return "Active";
    }
    return "offline";
  }, [conversation, isActive]);

  const handleBack = () => {
    router.push("/conversations");
  };

  return (
    <>
      <div
        className={cn("border-b-[1px] px-3 flex justify-between items-center")}
      >
        <div className="flex items-center gap-x-2">
          <HiChevronLeft
            onClick={handleBack}
            size={32}
            className={
              "lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
            }
          />
          <button
            className={cn(
              "w-fit relative flex items-center space-x-3   rounded-lg transition cursor-pointer p-2.5 "
            )}
          >
            {conversation?.isGroup ? (
              <AvatarGroup users={conversation?.users} />
            ) : (
              <AvatarComp
                imageUrl={otherUser?.image!}
                fallbackName={otherUser?.name!}
                isActive={isActive}
              />
            )}
            <div className="flex items-center justify-between">
              <div className="text-left text-sm ">
                <h3 className={"font-medium"}>
                  {conversation?.isGroup ? conversation?.name : otherUser?.name}
                </h3>
                <p>{statusText} </p>
              </div>
            </div>
          </button>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => onOpen(conversation)}
          className={
            "text-sky-500 cursor-pointer hover:text-sky-600 transition"
          }
        />
      </div>
    </>
  );
};

export default ConversationHeader;
