import api from "@/context/AxiosContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface DeleteConversationProps {
  conversationId: string;
  onSuccess(res: any): void;
  onError?(err: any): void;
}

export const deleteConversation = async (props: DeleteConversationProps) => {
  const { onSuccess, conversationId, onError } = props;
  try {
    const res = await api.delete(`/conversations/${conversationId}`);
    onSuccess(res);
  } catch (err) {
    onError?.(err);
    return err;
  }
};
