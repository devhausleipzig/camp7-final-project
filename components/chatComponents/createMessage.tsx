import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, FormEventHandler, useState } from "react";
import { methods } from "../../utils/methods";

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
					"content-type": "application/json"
				},
				body: JSON.stringify({
					content: message,
					authorId: author_id
				})
			});
			setMessage("");
		}
	});

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		postMessage.mutate();
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
				<form
					className="flex h-full bg-gray-500"
					onSubmit={handleSubmit}
				>
					<div className="flex bottom-0 bg-black">
						<input
							value={message}
							onChange={(event) => setMessage(event.target.value)}
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
