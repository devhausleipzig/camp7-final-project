import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import LocationSearch from "../components/locationSearch/locationSearch";
import DateField from "../components/profile/dateField";

export default function Registration2() {
  return (
    <div className="text-center h-screen">
      <Header />
      <DateField />
      {/* <LocationSearch address={address} setAddress={setAddress} /> */}
      <div className="absolute bottom-8 w-screen">
        <Button
          label={"CONTINUE"}
          link={{ pathname: "/registration3" }}
          variant={ButtonVariant.fill}
        />
        <Button
          label={"BACK"}
          link={{ pathname: "/registration1" }}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
