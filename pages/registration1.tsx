import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import ImageUpload from "../components/imagesUpload/imageUpload";
import NameField from "../components/profile/nameField";
import { RegistrationWrapper } from "../components/registrationWrapper";

export default function Registration1() {
  return (
    <RegistrationWrapper
      next={{ pathname: "/registration2" }}
      previous={{ pathname: "/login" }}
    >
      <div className="grid gap-12">
        <h1 className="heading-one">Create Your Profile</h1>
        <ImageUpload />
        <NameField />
      </div>
    </RegistrationWrapper>
  );
}
