import { Conversation } from "@prisma/client";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { methods } from "../../utils/methods";
import BackBottn from "../../public/go_back.svg";
import chat from ".";
import useProtectedPage from "../../hooks/useProtectedPage";
import Link from "next/link";

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
  const authContext = useProtectedPage();
  const [chats, setChats] = useState([] as Conversation[]);
  const [messages, setMessages] = useState([] as Conversation[]);

  useEffect(() => {
    const { chat_id } = router.query;
    GetMessages(setMessages, chat_id as string, authContext);
  }, [router.query]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  return (
    <>
      <div className="flex h-[15%] w-full">
        <button
          onClick={() => router.back()}
          className="h-6 w-6 rounded-full flex items-center"
        >
          {""}
          <BackBottn className="h-6 w-6 rounded-full" />
        </button>
        <div className="flex h-4/5 w-full p-3 gap-4 bg-slate-500">
          {chats.((chat, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: "/chat",
                  query: { chat_id: chat.id },
                }}
              >
                <div className="flex justify-start items-center px-4 py-2 h-[60px] w-full border-b-2 border-[#603BAD] gap-8">
                  <div className="h-8 w-8 rounded-full bg-slate-300">
                    {/* {[chat.participanr[0].images]} */}
                  </div>
                  <div className="flex ">
                    {[
                      // chat.id,
                      // chat.messages[0].content,
                      // chat.messages[0].createdAt,
                      chat.participant.find(
                        (user) => user.name !== authContext.user.name
                      ).name,
                    ]}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div>
          {chats.map((chat, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: "/chat",
                  query: { chat_id: chat.id },
                }}
              >
                <div className="h-auto w-auto rounded-tl-full rounded-b-full bg-slate-600">
                  {[
                    // chat.id,
                    chat.messages[0].content,
                    // chat.messages[0].createdAt,
                    // chat.participant[0].name,
                  ]}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
