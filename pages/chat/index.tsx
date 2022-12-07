import Link from "next/link";
import ChatHeader from "../../components/chatComponents/header";
import { Participant, useConversations } from "../../hooks/useConversations";
import useProtectedPage from "../../hooks/useProtectedPage";
import { getAvatar } from "../../utils/avatar";
import { getOtherParticipant } from "../../utils/chat";

export default function Chat() {
  const authContext = useProtectedPage();
  const { data: conversations, isLoading, isError } = useConversations();

  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col justify-between h-full">
        <ChatHeader />

        {/* TITLE Messasges */}
        <div className="text-xl flex justify-around items-center h-[8%] w-full bg-[#603BAD]">
          <p>Swipe a Friend</p>
        </div>
        {/* The Chats Layout BODY */}

        <div className="flex flex-col h-4/5 w-full p-3 gap-4 overflow-y-auto">
          {isLoading ? (
            <p>loading...</p>
          ) : (
            conversations.map((chat, index) => {
              return (
                <Link
                  key={index}
                  href={{
                    pathname: "/chat/[chat_id]",
                    query: { chat_id: chat.id },
                  }}
                >
                  <div className="flex justify-start items-center px-4 py-2 h-[60px] w-full border-b-2 border-[#603BAD] gap-8">
                    {getAvatar(
                      getOtherParticipant(
                        chat.participant,
                        authContext.user.name
                      ) ?? {}
                    )}
                    <div className="flex ">
                      {getOtherParticipant(
                        chat.participant,
                        authContext.user.name
                      )
                        ? getOtherParticipant(
                            chat.participant,
                            authContext.user.name
                          )?.name
                        : "Unknown"}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
