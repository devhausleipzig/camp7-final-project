import { Conversation } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ppid } from "process";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useConversation } from "../../hooks/useConversations";
import useProtectedPage from "../../hooks/useProtectedPage";
import BackButton from "../../public/go_back_white.svg";
import { getAvatar } from "../../utils/avatar";
import { getOtherParticipant } from "../../utils/chat";
import { methods } from "../../utils/methods";

async function GetMessages(
  setMessages: Dispatch<SetStateAction<Conversation[]>>,
  chat_id: string,
  authContext: any
) {
  const token = authContext.token;

  const messageResponse = await fetch(
    `http://localhost:3000/api/chat/${chat_id}/getMessages`,
    {
      method: methods.get,
    }
  );
  const chatResponse = await fetch("http://localhost:3000/api/chat", {
    method: methods.get,
    headers: { Authorization: token },
  });
  const data = await messageResponse.json();
  setMessages(data);
}

export default function ChatPage() {
  const router = useRouter();
  const { chat_id } = router.query;
  const authContext = useProtectedPage();
  const {
    data: conversation,
    isLoading,
    isError,
  } = useConversation(chat_id as string);

  if (isError) return <p>Something went wrong</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <header className="flex items-center justify-between bg-[#603BAD] py-3 px-5">
        <button
          onClick={() => router.back()}
          className="h-6 w-6 rounded-full flex items-center"
        >
          <BackButton className="h-6 w-6 rounded-full" />
        </button>
        <div className="flex items-center gap-4">
          {getAvatar(
            getOtherParticipant(
              conversation.participant,
              authContext.user.name
            ) ?? {}
          )}
          <h2 className="text-white font-medium">
            {getOtherParticipant(
              conversation.participant,
              authContext.user.name
            )
              ? getOtherParticipant(
                  conversation.participant,
                  authContext.user.name
                )?.name
              : "Unknown"}
          </h2>
        </div>
        <div />
      </header>
      <div className="flex flex-col gap-4">
        {conversation.messages.map((message) => (
          <div
            className={clsx(
              "p-4 w-1/3",
              message.authorId === authContext.user.id
                ? "bg-green-500 self-end"
                : "bg-blue-500 self-start"
            )}
          >
            {message.content}
          </div>
        ))}
      </div>
    </>
  );
}
