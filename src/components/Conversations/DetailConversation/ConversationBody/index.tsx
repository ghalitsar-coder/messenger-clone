"use client";

import { FullMessageType } from "@/types/components/ConversationListProps";
import useConversation from "@/utils/hooks/useConversation";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { seenMessage } from "@/utils/services/conversation/conversationBody";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationBodyProps {
  initialMessages: FullMessageType[];
}

const ConversationBody: React.FC<ConversationBodyProps> = (props) => {
  const { initialMessages } = props;
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLLIElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    // TODO: create function for seen  message
    const seenTheMessage = async () => {
      await seenMessage(conversationId);
    };
    seenTheMessage();
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });

    const messageHandler = async (message: FullMessageType) => {
      await seenMessage(conversationId);
      setMessages((prev) => {
        if (find(prev, { id: message.id })) {
          return prev;
        }
        return [...prev, message];
      });
      bottomRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((prev) =>
        prev.map((message) => {
          if (message.id === newMessage.id) {
            return newMessage;
          }
          return message;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <ul className="flex-1 overflow-y-auto ">
      {messages?.map((message, i) => (
        <li key={message.id}>
          <MessageBox data={message} isLast={i === messages.length - 1} />
        </li>
      ))}
      <li className="pt-2 " ref={bottomRef} />
    </ul>
  );
};

export default ConversationBody;
