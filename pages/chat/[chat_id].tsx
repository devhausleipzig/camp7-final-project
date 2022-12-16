import { Conversation } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useConversation } from "../../hooks/useConversations";
import BackButton from "../../public/go_back_white.svg";
import { getAvatar } from "../../utils/avatar";
import { getOtherParticipant } from "../../utils/chat";
import { methods } from "../../utils/methods";
import { CreateMessage } from "../../components/chatComponents/createMessage";
import groupBy from "just-group-by";
import { format } from "date-fns";
import { useAuthStore } from "../../stores/authStore";
import Link from "next/link";
import axios from "axios";

async function GetMessages(
  setMessages: Dispatch<SetStateAction<Conversation[]>>,
  chat_id: string,
  authContext: any
) {
  const token = authContext.token;
  const user = authContext.user;

  const messageResponse = await fetch(
    `http://localhost:3000/api/chat/${chat_id}/getMessages`,
    {
      method: methods.get,
    }
  );
  const data = await messageResponse.json();
  setMessages(data);
}

export default function ChatPage() {
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { chat_id } = router.query;
  const { user } = useAuthStore();
  const {
    data: conversation,
    isLoading,
    isError,
  } = useConversation(chat_id as string);

  useLayoutEffect(() => {
    const height = listRef.current?.scrollHeight;
    listRef.current?.scrollTo({ top: height });
  }, []);

  useEffect(() => {
    const height = listRef.current?.scrollHeight;
    listRef.current?.scrollTo({ top: height, behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    if (conversation) {
      console.log(getOtherParticipant(conversation.participant, user!.name));
    }
  }, [conversation]);

  if (isError) return <p>Something went wrong</p>;

  if (isLoading) return <p>Loading...</p>;

  const groupedMsgs = groupBy(conversation.messages, (el) =>
    new Date(el.createdAt).toLocaleDateString()
  );
  const messages = Object.entries(groupedMsgs)
    // .sort((a, b) => a[0].localeCompare(b[0]))
    .flatMap((entry) => {
      const [date, messages] = entry;
      return [
        <div
          key={date}
          className="flex justify-around items-center text-[#603BAD] font-light text-sm"
        >
          <div className="w-1/4 h-[1px] bg-[#603BAD]"></div>
          {date}
          <div className="w-1/4 h-[1px] bg-[#603BAD]"></div>
        </div>,
        ...messages
          .sort((a, b) =>
            new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1
          )
          .map((message) => {
            const ownMessage = message.authorId === user?.id;
            return (
              <div
                key={message.id}
                className={clsx(
                  "flex",
                  ownMessage ? "justify-end pl-12" : "justify-start pr-12"
                )}
              >
                <div
                  className={clsx(
                    "flex flex-col p-2 h-auto scroll-pb-1 break-words min-w-[90px] min-h-[45px]",
                    ownMessage
                      ? "bg-[#BCDCBF] rounded-l-2xl rounded-br-2xl"
                      : "bg-[#BFB1DE] rounded-r-2xl rounded-bl-2xl"
                  )}
                >
                  {message.content}
                  <div className={clsx("flex h-[16px] p-1  text-xs self-end")}>
                    {[
                      format(new Date(message.createdAt), "p"),
                      !message.read ? "read" : "unread",
                    ]}
                  </div>
                </div>
              </div>
            );
          }),
      ];
    });

  return (
    <div className="w-screen h-screen overflow-hidden grid grid-rows-custom grid-cols-1">
      <header className="flex items-center h-16 w-full justify-between bg-[#603BAD] py-3 px-5">
        <button
          onClick={() => router.back()}
          className="h-6 w-6 rounded-full flex items-center"
        >
          <BackButton className="h-6 w-6 rounded-full" />
        </button>

        <div className="flex items-center gap-4">
          <Link
            className="flex gap-3 items-center"
            href={`/chat/profile/${
              getOtherParticipant(conversation.participant, user!.name)?.id
            }`}
          >
            {getAvatar(
              getOtherParticipant(conversation.participant, user!.name) ?? {}
            )}
            <h2 className="text-white font-medium">
              {getOtherParticipant(conversation.participant, user!.name)
                ? getOtherParticipant(conversation.participant, user!.name)
                    ?.name
                : "Unknown"}
            </h2>
          </Link>
        </div>
        <div />
      </header>
      <div
        ref={listRef}
        className="flex flex-col flex-1 gap-2 py-4 px-3 h-full overflow-y-auto pb-16"
        id="faaa"
      >
        {messages}
      </div>

      <div className="absolute bottom-0 backdrop-blur-xs bg-white/30 flex justify-center h-16 items-center w-full">
        <div className="flex justify-items-center z-10 w-11/12 rounded-md border-2 border-[#603BAD]">
          <CreateMessage chat_id={chat_id as string} author_id={user!.id} />
        </div>
      </div>
    </div>
  );
}
