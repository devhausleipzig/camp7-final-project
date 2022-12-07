import Head from "next/head";
import Link from "next/link";
import Button, { ButtonVariant } from "../components/button/button";
import Test from "../components/test/test";
import useProtectedPage from "../hooks/useProtectedPage";
import Chat from "./chat";

export default function Home() {
  const authContext = useProtectedPage();

  return (
    <div>
      <main>
        <h1 className="text-3xl text-red-600">Camp #7 Final Project</h1>
      </main>
      <Button
        label={"CHAT"}
        link={{ pathname: "/chat" }}
        variant={ButtonVariant.transparent}
      />
      <Button
        label={"SEARCH"}
        link={{ pathname: "/cards" }}
        variant={ButtonVariant.fill}
      />
    </div>
  );
}
