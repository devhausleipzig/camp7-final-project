import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import ImageUpload from "../components/imagesUpload/imageUpload";
import NameField from "../components/profile/nameField";

export default function Registration1() {
  <div>
    <Header />;
    <ImageUpload />;
    <NameField />;
    <Button
      label={"CONTINUE"}
      link={{ pathname: "/registration2" }}
      variant={ButtonVariant.fill}
    />
    <Button
      label={"REGISTER"}
      link={{ pathname: "/register" }}
      variant={ButtonVariant.transparent}
    />
  </div>;
}
