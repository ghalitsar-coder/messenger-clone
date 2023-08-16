import api from "@/context/AxiosContext";

export const seenMessage = async (conversationId: string) => {
  try {
    return await api.post(`/conversations/${conversationId}/seen`);
  } catch (error: any) {
    return error;
  }
};
