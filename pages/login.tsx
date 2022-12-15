import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext } from "react";
import Button, { ButtonVariant } from "../components/button/button";
import { useAuthStore } from "../stores/authStore";
import { useNotificationStore } from "../stores/notificationStore";
import { methods } from "../utils/methods";

export default function Login() {
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  const { send } = useNotificationStore();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    try {
      const formData = new FormData(target);
      const formDataObj = Object.fromEntries(formData.entries());

      const loginResponse = await axios.post(
        "http://localhost:3000/api/auth/login",
        formDataObj
      );
      const loginBody = await loginResponse.data;
      const token = loginBody.token;
      const userResponse = await fetch("http://localhost:3000/api/user/me", {
        method: methods.get,
        headers: { Authorization: token },
      });

      const userBody = await userResponse.json();

      setUser(userBody);
      setToken(token);
      router.push({ pathname: "/" });
    } catch (err) {
      send({ status: "error", message: "Login failed" });
    }

    // if (loginResponse.status != 200) {
    //   // not logged in
    //   window.alert("Incorrect credentials.");
    // }
  }

  return (
    <div className="h-screen bg-white font-sans my-5 mx-5 rounded-lg text-center text-purple-600">
      <div className="pt-14">
        {/* <img
					src={LoginImg.src}
					alt="login image"
					className="text-[#68B684] h-48 mx-auto"
				/> */}
        <h1 className="text-3xl font-bold">Almost there...</h1>
        <form className="p-8 text-left" onSubmit={handleSubmit}>
          <label className="form_label">
            Email
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              className="form_input"
              size={32}
              required
            />
          </label>
          <label className="form_label">
            Password
            <input
              type="password"
              name="password"
              placeholder="Please enter your password"
              className="form_input"
              size={32}
              required
            />
          </label>
          <Button
            label={"LOGIN"}
            variant={ButtonVariant.fill}
            type={"submit"}
          />
        </form>

        <Button
          label={"REGISTER"}
          link={{ pathname: "/register" }}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
