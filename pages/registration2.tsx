import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import LocationSearch from "../components/locationSearch/locationSearch";
import DateField from "../components/profile/dateField";

export default function Registration1() {
  return (
    <div className="text-center">
      <Header />
      <DateField />
      {/* <LocationSearch address={address} setAddress={setAddress} /> */}
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
    </div>
  );
}
