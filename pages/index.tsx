import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import Button, { ButtonVariant } from "../components/button/button";
import Interest from "../components/interestCard/interestCard";
import CardComponent from "../components/interestCard/interestCard";
import InterestCard from "../components/interestCard/interestCard";
import LocationSearch from "../components/locationSearch/locationSearch";
import { Address } from "../hooks/useLocation";
import { useAuthStore } from "../stores/authStore";

async function queryUsers() {}

export default function Home() {
  const { token } = useAuthStore();
  const router = useRouter();
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    router.push({
      pathname: "/cards",
      query: {
        location: JSON.stringify(location?.center),
        distance: JSON.stringify(distance),
        interests: selectedInterests,
      },
    });
    // const result = await axios
    //   .get(
    //     `http://localhost:3000/api/user/?location=${location?.center}&radius=${distance}&interests=${selectedInterests}`,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   )
    //   .then(res => res.data);
  }

  const [location, setLocation] = useState<Address | null>(null);
  const [distance, setDistance] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<Array<string>>([]);

  useEffect(() => {
    console.log("location", location?.center);
    console.log("distance", distance);
    console.log("interests", selectedInterests);
  }, [location, distance, selectedInterests]);

  return (
    <div>
      <main>
        <form onSubmit={handleSubmit}>
          <LocationSearch
            location={location}
            setLocation={setLocation}
            distance={distance}
            setDistance={setDistance}
          />
          <CardComponent
            selected={selectedInterests}
            setSelected={setSelectedInterests}
          />
          <div className="flex justify-center">
            <div className="w-full mx-4">
              <Button
                label={"SEARCH"}
                // link={{ pathname: "/cards" }}
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
