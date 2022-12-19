import { Route } from "nextjs-routes";
import Button, { ButtonVariant } from "./button/button";
import Header from "./header";

type Props = {
  children: React.ReactNode;
  next: Route;
  previous: Route;
};

export function RegistrationWrapper({ children, next, previous }: Props) {
  return (
    <div className="h-screen text-center flex flex-col justify-between pb-5">
      <Header />
      {children}
      <div className="w-screen">
        <Button label={"CONTINUE"} link={next} variant={ButtonVariant.fill} />
        <Button
          label={"BACK"}
          link={previous}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
