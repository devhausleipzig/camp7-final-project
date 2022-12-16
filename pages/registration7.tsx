import Button, { ButtonVariant } from "../components/button/button";
import Header from "../components/header";
import CardMultiSelect from "../components/interestCard/interestCard";

export default function Registration6() {
  return (
    <div className="h-screen text-center">
      <Header />
      {/* <CardMultiSelect /> */}
      <div className="absolute bottom-5 w-screen">
        <Button
          label={"FINISH"}
          link={{ pathname: "/" }}
          variant={ButtonVariant.fill}
          type={"submit"}
        />
        <Button
          label={"BACK"}
          link={{ pathname: "/registration6" }}
          variant={ButtonVariant.transparent}
        />
      </div>
    </div>
  );
}
