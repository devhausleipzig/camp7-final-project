import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import ChatHeader from "../../components/chatComponents/header";
import { useConversations, Conversation } from "../../hooks/useConversations";
import { useAuthStore } from "../../stores/authStore";
import { getAvatar } from "../../utils/avatar";
import { getOtherParticipant } from "../../utils/chat";

export default function Chat() {
  const { data: conversations, isLoading, isError } = useConversations();

  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col h-full">
        {/* <ChatHeader /> */}

        {/* TITLE Messasges */}
        <div className="text-xl text-white flex items-center h-[8%] w-full border-b-2 border-[#603BAD]">
          <p className="text-[#603BAD] pl-8">Chats</p>
        </div>
        {/* The Chats Layout BODY */}

        <div className="flex flex-col h-4/5 w-full p-3 gap-4 overflow-y-auto">
          {isLoading ? (
            <p>loading...</p>
          ) : (
            conversations.map(chat => {
              return <ConversationItem key={chat.id} chat={chat} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

type ConversationItemProps = {
  chat: Conversation;
};

function ConversationItem({ chat }: ConversationItemProps) {
  const { user } = useAuthStore();

  const unreadMessage =
    chat.messages.length &&
    chat.messages.filter(m => m.authorId !== user!.id).some(m => !m.read);

  return (
    <Link
      href={{
        pathname: "/chat/[chat_id]",
        query: { chat_id: chat.id },
      }}
    >
      <div className="flex justify-start items-center px-4 py-2 h-[60px] w-full border-b-2 border-[#603BAD] gap-8">
        <div
          className={clsx(
            "ring-2 rounded-full p-[3px]",
            unreadMessage ? "ring-green-600" : "ring-transparent"
          )}
        >
          {getAvatar(getOtherParticipant(chat.participant, user!.name) ?? {})}
        </div>
        <div className="flex  pl-3">
          {getOtherParticipant(chat.participant, user!.name)
            ? getOtherParticipant(chat.participant, user!.name)?.name
            : "Unknown"}
        </div>
      </div>
    </Link>
  );
}
