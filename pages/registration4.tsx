import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import GenderField from "../components/profile/genderField";
import LanguagesField from "../components/profile/languagesField";

export default function Registration4() {
  return (
    <div className="h-screen text-center">
      <Header />
      <LanguagesField />
      <div className="absolute bottom-5 w-screen">
        <Button
          label={"CONTINUE"}
          link={{ pathname: "/registration5" }}
          variant={ButtonVariant.fill}
        />
        <Button
          label={"BACK"}
          link={{ pathname: "/registration3" }}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
