import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import LocationSearch from "../components/locationSearch/locationSearch";
import DateField from "../components/profile/dateField";
import { RegistrationWrapper } from "../components/registrationWrapper";
import { Address } from "../hooks/useLocation";

export default function Registration2() {
  const [location, setLocation] = useState<Address | null>(null);

  useEffect(() => {
    console.log("location", location?.center);
  }, [location]);

  return (
    <RegistrationWrapper
      next={{ pathname: "/registration3" }}
      previous={{ pathname: "/registration1" }}
    >
      <DateField />
      <h3 className="text-purple text-xl font-quicksand font-bold">
        Where Are You Based?
      </h3>
      <LocationSearch location={location} setLocation={setLocation} />
    </RegistrationWrapper>
  );
}
