import useProtectedPage from "../hooks/useProtectedPage";

export default function Chat() {
  const authContext = useProtectedPage();

  return <div>chat page</div>;
}
