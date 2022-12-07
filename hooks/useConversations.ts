import useProtectedPage from "./useProtectedPage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type Participant = {
  id: string;
  name: string;
  avatar?: string;
  interests: string[];
};

export type Message = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  conversationId: string;
  authorId: string;
};

export type Conversation = {
  id: string;
  createdAt: string;
  messages: Message[];
  participant: Participant[];
};

export function useConversations() {
  const authContext = useProtectedPage();

  const token = authContext.token;

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
  const authContext = useProtectedPage();

  const token = authContext.token;

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
    enabled: !!chatId,
    refetchInterval: 5000,
  });
}