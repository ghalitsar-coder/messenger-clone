import api from "@/context/AxiosContext";
import {
  SendMessageProps,
  UploadImageProps,
} from "@/types/components/ConversationForm";
import axios from "axios";
// import toast from "react-hot-toast";

export const sendMessage = async (params: SendMessageProps) => {
  const { data } = params;
  try {
    const response = await api.post("/messages", data);
  } catch (err) {
    return err;
  }
};

export const uploadImage = async (data: UploadImageProps) => {
  try {
    const response = await api.post("/messages", data);
  } catch (err) {
    return err;
  }
};
