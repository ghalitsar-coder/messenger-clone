import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useActiveList from "@/utils/hooks/useActiveList";

interface AvatarCompProps {
  fallbackName: string;
  imageUrl: string;
  isActive?: boolean;
}

const AvatarComp = (props: AvatarCompProps) => {
  const { fallbackName, imageUrl, isActive } = props;
  const [first, ...rest] = fallbackName ? fallbackName?.split(" ") : [];

  const initialName = fallbackName
    ? fallbackName.split(" ").length > 1
      ? UFL(first)
      : `${UFL(first)}${UFL(rest.at(-1))}`
    : null;
  return (
    <Avatar>
      <AvatarImage src={imageUrl ?? "/images/placeholder1.jpg"} />
      {/* <AvatarFallback className="font-semibold">
        {initialName ?? "A"}
      </AvatarFallback> */}
      {isActive && (
        <div className="absolute top-0   bg-green-500 w-3 h-3 rounded-full right-0 ring-2 ring-white " />
      )}
    </Avatar>
  );
};

export default AvatarComp;

const UFL = (name?: string) => {
  return name?.at(0)?.toUpperCase();
};
