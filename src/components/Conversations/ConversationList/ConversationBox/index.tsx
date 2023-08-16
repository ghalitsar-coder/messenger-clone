import React, { useCallback, useMemo } from "react";
import { FullConversationType } from "@/types/components/ConversationListProps";
import { useOtherUser } from "@/utils/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import AvatarComp from "@/components/Avatar";
import { format } from "date-fns";
import AvatarGroup from "../../AvatarGroup";
import useActiveList from "@/utils/hooks/useActiveList";

interface ConversationBox {
  data: FullConversationType;
  selected: boolean;
}

const ConversationBox: React.FC<ConversationBox> = (props) => {
  const { data, selected } = props;
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email as never) !== -1;


  const handleConversation = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages.at(-1);
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Start a conversation";
  }, [lastMessage]);

  return (
    <button
      onClick={handleConversation}
      className={cn(
        "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-2.5",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data?.isGroup ? (
        <AvatarGroup cvBox users={data.users} />
      ) : (
        <AvatarComp
          imageUrl={otherUser?.image!}
          fallbackName={otherUser?.name!}
          isActive={isActive}
        />
      )}
      <div className="flex w-full   items-center justify-between">
        <div className="text-left text-sm ">
          <h3 className={" font-semibold"}>{data?.name || otherUser?.name}</h3>
          <p
            className={cn(
              "truncate ",
              hasSeen ? "text-gray-500" : "font-semibold text-black",
              lastMessage?.body ? " lg:max-w-[150px]" : ""
            )}
          >
            {" "}
            {lastMessageText}{" "}
          </p>
        </div>
        {lastMessage?.createdAt && (
          <p className="text-xs whitespace-nowrap text-gray-400 font-light">
            {format(new Date(lastMessage.createdAt), "p")}
          </p>
        )}
      </div>
    </button>
  );
};

export default ConversationBox;
