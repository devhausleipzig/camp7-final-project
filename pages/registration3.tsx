import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import GenderField from "../components/profile/genderField";

export default function Registration3() {
  return (
    <div className="h-screen text-center">
      <Header />
      <GenderField />
      <div className="absolute bottom-5 w-screen">
        <Button
          label={"CONTINUE"}
          link={{ pathname: "/registration4" }}
          variant={ButtonVariant.fill}
        />
        <Button
          label={"BACK"}
          link={{ pathname: "/registration2" }}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
