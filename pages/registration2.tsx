import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import ImageUpload from "../components/imagesUpload/imageUpload";
import LocationSearch from "../components/locationSearch/locationSearch";
import DateField from "../components/profile/dateField";
import NameField from "../components/profile/nameField";

export default function Registration1() {
  <div>
    <Header />;
    <DateField />
    <LocationSearch address={address} setAddress={setAddress} />
    <Button
      label={"CONTINUE"}
      link={{ pathname: "/registration3" }}
      variant={ButtonVariant.fill}
    />
    <Button
      label={"REGISTER"}
      link={{ pathname: "/registration2" }}
      variant={ButtonVariant.transparent}
    />
  </div>;
}
