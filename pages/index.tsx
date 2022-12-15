import { FormEvent, SetStateAction, useState } from "react";
import Button, { ButtonVariant } from "../components/button/button";
import Interest from "../components/interestCard/interestCard";
import CardComponent from "../components/interestCard/interestCard";
import InterestCard from "../components/interestCard/interestCard";
import LocationSearch from "../components/locationSearch/locationSearch";

async function queryUsers() {}

export default function Home() {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement;
  }

  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<Array<string>>([]);

  return (
    <div>
      <main>
        <form onSubmit={handleSubmit}>
          <LocationSearch address={address} setAddress={setAddress} />
          <CardComponent
            selected={selectedInterests}
            setSelected={setSelectedInterests}
          />
          <div className="flex justify-center">
            <div className="w-full mx-4">
              <Button
                label={"SEARCH"}
                link={{ pathname: "/cards" }}
                variant={ButtonVariant.fill}
                type="submit"
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
