import { FormEvent, FormEventHandler, useState } from "react";

interface Props {
  chat_id: string;
  author_id: string;
}

const initialMessage = {
  name: "",
  content: "",
};

export function CreateMessage({ chat_id, author_id }: Props) {
  const [message, setMessage] = useState(initialMessage);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const response = fetch(`http://localhost:3000/chat/${chat_id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          content: message.content,
          authorId: author_id,
        }),
      });
      setMessage(initialMessage);
    } catch (err) {
      alert("Something went wrong");
    }
  }

  return (
    // <form onSubmit={handleSubmit} className="flex h-full bg-gray-500">
    //   <input
    //     value={message.message}
    //     onChange={(event) =>
    //       setMessage({ ...message, message: event.target.value })
    //     }
    //     name="message"
    //     placeholder="type your message...."
    //   />
    //   <button className="bg-slate-700 p-2 text-slate-50" type="submit">
    //     Send
    //   </button>
    // </form>

    <div className="flex absolute justify-center items-center bottom-0 w-full h-[8%]">
      <div className="flex justify-items-center w-11/12 h-4/5 bg-blue-800 border-2 border-pink-600">
        <form className="flex h-full bg-gray-500" onSubmit={handleSubmit}>
          <div className="flex bottom-0 bg-black">
            <input
              value={message.content}
              onChange={(event) =>
                setMessage({ ...message, content: event.target.value })
              }
              placeholder="type your message...."
            />
          </div>
          <button className="" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
