import { Conversation } from "@prisma/client";
import Link from "next/link";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AppIcon from "../../public/app-icon.svg";
import HamMenu from "../../public/Ham-Menu.svg";
import BackBottn from "../../public/Back-Bottn.svg";
import { methods } from "../../utils/methods";
import chat from "../api/chat";
import useProtectedPage from "../../hooks/useProtectedPage";
import ChatHeader from "../../components/chatComponents/header";

async function GetChat(
  setChats: Dispatch<SetStateAction<Conversation[]>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setIsError: Dispatch<SetStateAction<boolean>>,
  authContext: any
) {
  const token = authContext.token;
  setIsLoading(true);

  const chatResponse = await fetch("http://localhost:3000/api/chat", {
    method: methods.get,
    headers: { Authorization: token },
  });

  setIsLoading(false);

  if (chatResponse.status == 200) {
    const responseData = await chatResponse.json();
    setChats(responseData);
    return responseData;
  }
  if (chatResponse.status == 401) {
    setIsError(true);
    console.log("attemted to make a request: bad token");
    return;
  }
  setIsError(true);
  console.log("server error");
}

export default function Chat() {
  const authContext = useProtectedPage();
  const [chats, setChats] = useState([] as Conversation[]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    GetChat(setChats, setIsLoading, setIsError, authContext);
  }, []);

  useEffect(() => {
    console.log(chats);
  }, [chats]);
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
          {isloading ? (
            <p>loading...</p>
          ) : isError ? (
            <p>try again later</p>
          ) : (
            chats.map((chat, index) => {
              return (
                <Link
                  key={index}
                  href={{
                    pathname: "/chat/[chat_id]",
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
            })
          )}
        </div>
      </div>
    </div>
  );
}
