import ConversationList from "@/components/Conversations/ConversationList";
import Sidebar from "@/components/Users/Sidebar";
import { getConversations } from "@/utils/actions/getConversations";
import getUsers from "@/utils/actions/getUsers";
import React from "react";

interface ConversationLayoutProps {
  children: React.ReactNode;
}

export default async function ConversationLayout(
  props: ConversationLayoutProps
) {
  const { children } = props;
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations ?? []} />
        {children}
      </div>
    </Sidebar>
  );
}
