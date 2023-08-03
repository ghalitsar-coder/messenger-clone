import { User } from "@prisma/client";
import { IconType } from "react-icons";

export interface MobileAndDesktopItemProps {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?(): void;
}

export interface CurrentUserProps {
  currentUser: User;
}
