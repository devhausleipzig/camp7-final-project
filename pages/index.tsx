import Button, { ButtonVariant } from "../components/button/button";
import LocationSearch from "../components/locationSearch/locationSearch";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Home() {
  const authContext = useProtectedPage();

  return (
    <div>
      <main>
        <div>
          <LocationSearch />
          <div className="flex justify-center">
            <div className="w-full mx-4">
              <Button
                label={"SEARCH"}
                link={{ pathname: "/cards" }}
                variant={ButtonVariant.fill}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
