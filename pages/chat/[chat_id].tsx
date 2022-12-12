import { Conversation } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useConversation } from "../../hooks/useConversations";
import useProtectedPage from "../../hooks/useProtectedPage";
import BackButton from "../../public/go_back_white.svg";
import { getAvatar } from "../../utils/avatar";
import { getOtherParticipant } from "../../utils/chat";
import { methods } from "../../utils/methods";
import { CreateMessage } from "../../components/chatComponents/createMessage";

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
    <div className="w-screen h-screen">
      <header className="flex items-center justify-between h-[9%] bg-[#603BAD] py-3 px-5">
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
        <div>
          {getOtherParticipant(
            conversation.participant,
            authContext.user.name
          )?.interests.map((interest) => (
            <span key={interest.id}>{interest.name}</span>
          ))}
        </div>
      </header>
      <div className="flex flex-col gap-2 py-2 px-3 h-[92%] overflow-y-auto">
        {conversation.messages.map((message) => (
          <div
            className={clsx(
              "p-2 w-1/3 h-auto",
              message.authorId === authContext.user.id
                ? "bg-[#BCDCBF] h-auto w-auto self-end rounded-l-2xl rounded-br-2xl"
                : "bg-[#BFB1DE] h-auto w-auto self-start rounded-r-2xl rounded-bl-2xl"
            )}
          >
            {message.content}
          </div>
        ))}
      </div>
      <CreateMessage
        chat_id={chat_id as string}
        author_id={authContext.user.id}
      />
      {/* <div className="flex absolute justify-center items-center bottom-0 w-full h-[8%]">
        <div className="flex justify-items-center w-11/12 h-4/5 bg-blue-800 border-2 border-pink-600">
          
          <form className="flex h-full bg-gray-500" onSubmit={handleSubmit}>
            <div className="flex bottom-0 bg-black">
              <input
                // type={message.content}
                name="message"
                placeholder="type your message...."
              />
            </div>
          </form>

          <button className="" onSubmit={handleSubmit}>
            Submit
          </button>
        </div>
      </div> */}
    </div>
  );
}
