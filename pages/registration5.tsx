import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import DescriptionField from "../components/profile/descriptionField";

export default function Registration5() {
  return (
    <div className="h-screen text-center">
      <Header />
      <DescriptionField />
      <div className="absolute bottom-5 w-screen">
        <Button
          label={"CONTINUE"}
          link={{ pathname: "/registration6" }}
          variant={ButtonVariant.fill}
        />
        <Button
          label={"BACK"}
          link={{ pathname: "/registration4" }}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
