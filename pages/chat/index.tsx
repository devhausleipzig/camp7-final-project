import { Conversation } from "@prisma/client";
import Link from "next/link";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useProtectedPage from "../../hooks/useProtectedPage";
import BackBottn from "../../public/Back-Bottn.svg";
import HamMenu from "../../public/Ham-Menu.svg";
import { methods } from "../../utils/methods";
import chat from "../api/chat";

async function GetChat(setChats: Dispatch<SetStateAction<Conversation[]>>) {
  const chatResponse = await fetch("http://localhost:3000/api/chat", {
    method: methods.get,
  });
  const data = await chatResponse.json();
  setChats(data);
}

export default function Chat() {
  const [chats, setChats] = useState([] as Conversation[]);

  useEffect(() => {
    GetChat(setChats);
  }, []);

  useEffect(() => {
    console.log(chats);
  }, [chats]);
  return (
    <div className=" h-screen w-screen">
      {/* HEADER */}
      <div className="flex justify-around items-center h-[12%] w-full bg-slate-500">
        <HamMenu className="h-8 w-8" />
        <BackBottn className="h-8 w-[80%]" />
      </div>
      {/* FRIEND INFOS */}
      <div className="flex justify-around items-center h-[8%] w-full bg-green-400">
        <button
          onClick={() => router.back()}
          className=" text-lg h-6 w-6 rounded-full border-solid border-[1px] border-slate-600 flex items-center"
        >
          {""}
          <BackBottn className="h-6 w-6" />
        </button>
        {/* Avatar */}
        <div className="flex justify-around items-center h-8 w-8 rounded-full bg-red-500">
          Img
        </div>
        <p>Friend Name</p>
        <p>Interests</p>
      </div>
      {/* The Chat Layout BODY */}

      <div className="flex flex-col gap-2">
        {chats.map((chat, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: "/chat/[chat_id]",
                query: { chat_id: chat.id },
              }}
            >
              <div className="flex w-full px-4 py-2 gap-3 bg-blue-400">
                {chat.id}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Text Entery FOOTER */}
      <div className="h-[10%] w-full bg-slate-400"></div>
    </div>
  );
}
