"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ConversationListProps,
  FullConversationType,
} from "@/types/components/ConversationListProps";
import useConversation from "@/utils/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import useAddConversation from "@/utils/hooks/useAddConversation";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

const ConversationList: React.FC<ConversationListProps> = (props) => {
  const { initialItems, users } = props;

  const [items, setItems] = useState(initialItems);
  const { onOpen, getUsers } = useAddConversation();
  const session = useSession();
  const router = useRouter();

  const { isOpen, conversationId } = useConversation();

  const renderConversation = useMemo(() => {
    if (items.length) {
      return (
        <ul className="grid gap-y-3.5">
          {items.map((item) => (
            <li key={item.id}>
              <ConversationBox
                data={item}
                selected={conversationId === item.id}
              />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="grid justify-center text-center gap-y-2 text-sm ">
        <h3>You don`t have conversation with anyone</h3>
        <p className="text-xs">Let`s make a new friend for you </p>
      </div>
    );
  }, [items, conversationId]);

  useEffect(() => {
    if (users.length) {
      getUsers(users);
    }
  }, [users]);

  const pusherKey = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((prev) => {
        if (find(prev, { id: conversation.id })) {
          return prev;
        }
        return [conversation, ...prev];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((prev) =>
        prev.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((prev) => prev.filter((conv) => conv.id !== conversation.id));
      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:block lg:w-80 overflow-y-auto border-r border-gray-200",
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4 ">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <button
            onClick={onOpen}
            className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
          >
            <MdOutlineGroupAdd />
          </button>
        </div>
        {renderConversation}
      </div>
    </aside>
  );
};

export default ConversationList;
