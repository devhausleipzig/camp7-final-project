import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { User } from "@prisma/client";

type AuthUser = Omit<User, "saltAndHash">;

export const AuthContext = createContext(
	{} as {
		token: string;
		setToken: Dispatch<SetStateAction<string>>;
		user: AuthUser;
		setUser: Dispatch<SetStateAction<AuthUser>>;
	}
);

export default function App({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState({} as AuthUser);
	const [token, setToken] = useState("");

	return (
		<>
			<Head>
				<title>Task App</title>
				<meta content="Friend-zone Tinder App"></meta>
				<link rel="icon" href="../public/images/silly.ico" />
			</Head>
			<AuthContext.Provider
				value={{
					token,
					setToken,
					user,
					setUser
				}}
			>
				<Component {...pageProps} />
			</AuthContext.Provider>
		</>
	);
}
