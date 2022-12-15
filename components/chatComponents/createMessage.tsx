import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, FormEventHandler, useState } from "react";
import { methods } from "../../utils/methods";
import Sailing from "../../public/sailing.svg";

interface Props {
  chat_id: string;
  author_id: string;
}

export function CreateMessage({ chat_id, author_id }: Props) {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const postMessage = useMutation({
    mutationKey: ["conversations", chat_id],
    mutationFn: async () => {
      await fetch(`http://localhost:3000/api/chat/${chat_id}`, {
        method: methods.post,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          authorId: author_id,
        }),
      });
      setMessage("");
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (message !== "") {
      postMessage.mutate();
    }
  }

  return (
    <div className=" h-full w-full p-1 bg-white rounded-md">
      <form className="flex items-center h-full" onSubmit={handleSubmit}>
        <input
          className="w-full h-full px-3 outline-none bg-white rounded-md"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="type your message...."
        />
        <div className="flex bg-white items-center justify-center pr-10">
          <button type="submit">
            <Sailing className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
