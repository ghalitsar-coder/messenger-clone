"use client";

import AvatarComp from "@/components/Avatar";
import Drawer from "@/components/CUSTOM/Drawer";
import AvatarGroup from "@/components/Conversations/AvatarGroup";
import { Button } from "@/components/ui/button";
import { FullMessageType } from "@/types/components/ConversationListProps";
import useActiveList from "@/utils/hooks/useActiveList";
import useDeleteModal from "@/utils/hooks/useDeleteModal";
import { useOtherUser } from "@/utils/hooks/useOtherUser";
import useProfileDrawer, { ConvProps } from "@/utils/hooks/useProfileDrawer";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { HiTrash } from "react-icons/hi2";

const ProfileDrawer: React.FC<any> = (props) => {
  const { isOpen, onClose, data } = useProfileDrawer();
  const { onOpen: onOpenDeleteModal } = useDeleteModal();

  const otherUser = useOtherUser(data as ConvProps);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email as never) !== -1;

  const joinedDate = useMemo(() => {
    if (isOpen) {
      return format(new Date(otherUser?.createdAt), "PP");
    }
  }, [otherUser?.createdAt, isOpen]);

  const title = useMemo(() => {
    if (isOpen && (data?.name || otherUser?.name)) {
      return data?.name || otherUser?.name;
    }
  }, [data?.name, otherUser?.name, isOpen]);

  const statusText = useMemo(() => {
    if (isOpen && data?.isGroup) {
      return `${data?.users.length} members`;
    }

    if (isActive) {
      return "Active";
    }
    return "Offline";
  }, [data, isOpen, isActive]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleDeleteModal = () => {};

  return (
    <Drawer isOpen={isOpen} onChange={onChange}>
      <div className="grid place-items-center ">
        <div className="space-y-2.5 ">
          <div className="flex justify-center">
            {data?.isGroup ? (
              <AvatarGroup users={data.users} />
            ) : (
              <AvatarComp
                imageUrl={otherUser?.image!}
                fallbackName={data?.name || otherUser?.name!}
                isActive={isActive}
              />
            )}
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-sm"> {title} </h3>
            <h4 className={"text-xs"}> {statusText} </h4>
          </div>
        </div>

        <div className="mt-5">
          <Button
            size={"icon"}
            onClick={onOpenDeleteModal}
            className="bg-gray-300  group !rounded-full !p-2"
          >
            <HiTrash
              className={"text-black transition group-hover:text-red-400 "}
              size={20}
            />
          </Button>
        </div>
      </div>
      {!data?.isGroup ? (
        <div className="text-sm  space-y-3.5 ">
          <div className="mt-12">
            <h3>Email</h3>
            <h4 className="font-semibold"> {otherUser?.email} </h4>
          </div>
          <div className="border-b"></div>
          <div className="">
            <h3>Joined</h3>
            <h4 className="font-semibold"> {joinedDate} </h4>
          </div>
        </div>
      ) : (
        <ul className="space-y-5 max-h-[650px] overflow-y-auto ">
          {data?.users?.map((user) => (
            <li key={user.id} className="text-sm  space-y-1.5 ">
              <div>
                <h3>Email</h3>
                <h4 className="font-semibold"> {user?.email} </h4>
              </div>
              <div className="border-b"></div>
              <div className="">
                <h3>Joined</h3>
                <time className="font-semibold">
                  {" "}
                  {format(new Date(user?.createdAt), "PP")}{" "}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
};

export default ProfileDrawer;
