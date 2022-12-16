import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import LocationRegister from "../components/locationSearch/locationRegister";
import DateField from "../components/profile/dateField";
import { Address } from "../hooks/useLocation";

export default function Registration2() {
  const [location, setLocation] = useState<Address | null>(null);

  useEffect(() => {
    console.log("location", location?.center);
  }, [location]);

  return (
    <div className="text-center h-screen">
      <Header />
      <DateField />
      <h3 className="text-purple text-xl font-quicksand font-bold">
        Where Are You Based?
      </h3>
      <LocationRegister location={location} setLocation={setLocation} />
      <div className="absolute bottom-5 w-screen">
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
