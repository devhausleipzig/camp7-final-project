import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import GenderField from "../components/profile/genderField";

export default function Registration1() {
  <div>
    <Header />;
    <GenderField />
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
