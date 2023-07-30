"use client";

import { cn } from "@/lib/utils";
import { MobileAndDesktopItemProps } from "@/types/components/DesktopItem";
import Link from "next/link";
import React from "react";

const MobileItem = (props: MobileAndDesktopItemProps) => {
  const { active, href, icon: Icon, onClick } = props;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={cn(
        "py-3 hover:text-black hover:bg-gray-300 leading-6 font-semibold w-full flex justify-center",
        active && "bg-gray-300 text-black"
      )}
      onClick={handleClick}
    >
      <Link href={href}>
        <Icon />
      </Link>
    </button>
  );
};

export default MobileItem;
