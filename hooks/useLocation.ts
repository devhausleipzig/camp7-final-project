import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export type Address = {
  place_name: string;
  center: [number, number];
};

export function useLocation(query: string) {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoicmVhbGx5Ym9hcmQiLCJhIjoiY2xhdXd6Yzd4MDA2ZTNvbHR5dGlrbzlhZyJ9.-VLPpmZjVi5zq_eeM-Q5yA&autocomplete=true`;

  return useQuery<Address[]>({
    queryKey: ["location", query],
    queryFn: () => axios.get(endpoint).then((res) => res.data.features),
    enabled: !!query,
  });
}

export function useGpsLocation() {
  const [location, setLocation] = useState<[number, number]>([0, 0]);
  const [lat, lon] = location;

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      undefined,
      { enableHighAccuracy: true }
    );
  }, []);
  return useQuery<Address[]>({
    queryKey: ["gpslocation", `${lat}-${lon}`],
    queryFn: () => {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1IjoicmVhbGx5Ym9hcmQiLCJhIjoiY2xhdXd6Yzd4MDA2ZTNvbHR5dGlrbzlhZyJ9.-VLPpmZjVi5zq_eeM-Q5yA`;
      return axios.get(endpoint).then((res) => res.data.features);
    },
    enabled: !!lat && !!lon,
  });
}
