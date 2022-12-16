import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import ImageUpload from "../components/imagesUpload/imageUpload";
import NameField from "../components/profile/nameField";

export default function Registration1() {
  return (
    <div className="h-screen text-center">
      <Header />
      <div className="grid gap-12">
        <h1 className="text-purple text-2xl font-quicksand font-bold text-center ">
          Create Your Profile
        </h1>
        <ImageUpload />
        <NameField />
      </div>
      <div className="absolute bottom-5 w-screen">
        <Button
          label={"CONTINUE"}
          link={{ pathname: "/registration2" }}
          variant={ButtonVariant.fill}
        />
        <Button
          label={"BACK"}
          link={{ pathname: "/register" }}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
