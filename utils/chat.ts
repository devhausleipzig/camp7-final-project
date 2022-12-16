import { Participant } from "../hooks/useConversations";

export function getOtherParticipant(
  participants: Participant[],
  userName: string
) {
  return participants.find((user) => user.name !== userName);
}
