import ConversationBody from "@/components/Conversations/DetailConversation/ConversationBody";
import ConversationForm from "@/components/Conversations/DetailConversation/ConversationForm";
import ConversationHeader from "@/components/Conversations/DetailConversation/ConversationHeader";
import EmptyState from "@/components/Users/EmptyState";
import { getConversationById } from "@/utils/actions/getConversationById";
import { getMessages } from "@/utils/actions/getMessages";
import React from "react";

interface DetailConversationProps {
  params: {
    conversationId: string;
  };
}

const DetailConversation: React.FC<DetailConversationProps> = async (props) => {
  const { params } = props;
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full ">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full  ">
      <div className="h-full flex flex-col">
        <ConversationHeader conversation={conversation} />
        <ConversationBody initialMessages={messages} />
        <ConversationForm />
      </div>
    </div>
  );
};

export default DetailConversation;
