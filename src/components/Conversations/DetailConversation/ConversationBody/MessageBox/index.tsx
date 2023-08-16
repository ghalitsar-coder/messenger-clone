import AvatarComp from "@/components/Avatar";
import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types/components/ConversationListProps";
import useModalImage from "@/utils/hooks/useModalImage";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface MessageBox {
  data: FullMessageType;
  isLast: boolean;
}

const MessageBox: React.FC<MessageBox> = (props) => {
  const { isLast, data } = props;
  const { onOpen } = useModalImage();
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(", ");

  const container = cn("flex   gap-1.5 p-2.5", isOwn && "justify-end");
  const avatar = cn("flex gap-3 p-2.5", isOwn && "order-2");
  const body = cn("flex flex-col gap-2", isOwn && "items-end");
  const message = cn(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <AvatarComp
          imageUrl={data.sender.image!}
          fallbackName={data.sender.name!}
        />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <h3>{data.sender.name}</h3>
          <h4>{format(new Date(data.createdAt), "p")}</h4>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              onClick={() => onOpen(data.image as string)}
              alt="Image"
              height={288}
              width={288}
              src={data.image}
              className={
                "object-cover  cursor-pointer hover:scale-110 transition translate"
              }
            />
          ) : (
            <p>{data.body}</p>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <p className="text-xs font-light text-gray-500">Seen</p>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
