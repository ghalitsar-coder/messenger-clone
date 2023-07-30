import { IconType } from "react-icons";

export interface MobileAndDesktopItemProps {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?(): void;
}
