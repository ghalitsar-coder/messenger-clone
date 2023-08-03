import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarCompProps {
  fallbackName: string;
  imageUrl: string;
}

const AvatarComp = (props: AvatarCompProps) => {
  const { fallbackName, imageUrl } = props;
  console.log(`THIS IS   imageUrl:`, imageUrl);
  const [first, ...rest] = fallbackName.split(" ");
  const initialName =
    fallbackName.split(" ").length > 1
      ? UFL(first)
      : `${UFL(first)}${UFL(rest.at(-1))}`;
  return (
    <Avatar>
      <AvatarImage src={imageUrl ?? "https://github.com/shadcn.png"} />
      <AvatarFallback>{initialName ?? "A"}</AvatarFallback>
      <div className="absolute top-0   bg-green-500 w-3 h-3 rounded-full right-0 ring-2 ring-white "></div>
    </Avatar>
  );
};

export default AvatarComp;

const UFL = (name?: string) => {
  return name?.at(0)!.toUpperCase();
};
