import useProtectedPage from "./useProtectedPage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";

export type Interest = {
  id: string;
  name: string;
};

export type Participant = {
  id: string;
  name: string;
  avatar?: string;
  interests: Interest[];
};

export type Message = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  conversationId: string;
  authorId: string;
  read: boolean;
};

export type Conversation = {
  id: string;
  createdAt: string;
  messages: Message[];
  participant: Participant[];
};

export function useConversations() {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios
        .get<Conversation[]>("http://localhost:3000/api/chat", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data),
    onError: (err) => console.log("Error in Conversations Query", err),
  });
}

export function useConversation(chatId: string) {
  const { token, user } = useAuthStore();

  return useQuery({
    queryKey: ["conversations", chatId],
    queryFn: () =>
      axios
        .get<Conversation>(`http://localhost:3000/api/chat/${chatId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data),
    onError: (err) => console.log("Error in Conversation Query", err),
    onSuccess: async () => {
      axios.patch(`http://localhost:3000/api/chat/${chatId}`, {
        userId: user?.id,
      });
    },
    enabled: !!chatId,
    refetchInterval: 500,
  });
}
