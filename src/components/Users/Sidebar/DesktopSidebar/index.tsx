"use client";

import useRoutes from "@/utils/hooks/useRoutes";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";
import { CurrentUserProps } from "@/types/components/DesktopItem";
import Avatar from "@/components/Avatar";
import useSettingModal from "@/utils/hooks/useSettingModal";
import SettingModal from "../SettingModal";
import useActiveList from "@/utils/hooks/useActiveList";

const DesktopSidebar = (props: CurrentUserProps) => {
  const { currentUser } = props;
  const { onOpen } = useSettingModal();
  const { members } = useActiveList();
  const isActive = members.indexOf(currentUser?.email as never) !== -1;

  const routes = useRoutes();
  return (
    <>
      <SettingModal currentUser={currentUser} />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between ">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className={"flex flex-col items-center gap-y-1"}>
            {routes.map((item) => (
              <DesktopItem key={item.label} {...item} />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <button
            onClick={() => onOpen()}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar
              imageUrl={currentUser?.image!}
              fallbackName={currentUser?.name!}
              isActive={isActive}
            />
          </button>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
