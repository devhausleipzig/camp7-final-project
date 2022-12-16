import { useState } from "react";
import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import CardMultiSelect from "../components/interestCard/interestCard";
import InterestSelect from "../components/interestCard/interestRegister";

export default function Registration6() {
  const [selectedInterests, setSelectedInterests] = useState<Array<string>>([]);
  return (
    <div className="h-screen text-center">
      <Header />
      <InterestSelect
        selected={selectedInterests}
        setSelected={setSelectedInterests}
      />
      <div className="bottom-5 w-auto mx-2">
        <Button label={"SUBMIT"} variant={ButtonVariant.fill} type={"submit"} />
        <Button
          label={"BACK"}
          link={{ pathname: "/registration5" }}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
