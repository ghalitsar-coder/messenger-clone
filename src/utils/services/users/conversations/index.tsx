import api from "@/context/AxiosContext";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import toast from "react-hot-toast";

interface CreateConversationProps {
  userId?: string;
  isGroup?: boolean;
  name?: string;
  members?: any[];
  onSuccess: (data: AxiosResponse<any, any>) => void;
}

export const createConversation = async (props: CreateConversationProps) => {
  const { onSuccess, ...data } = props;
  try {
    const response = await api.post("/conversations", { ...data });
    onSuccess(response);
  } catch (err: any) {
    toast.error("Something went wrong when creating conversation");
    console.error("THIS IS ERROR ->", err?.message);
  }
};
