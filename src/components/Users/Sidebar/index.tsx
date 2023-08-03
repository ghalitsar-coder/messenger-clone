import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/utils/actions/getCurrentUser";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = async ({ children }: SidebarProps) => {

  const user = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={user!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
