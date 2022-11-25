import { Coord } from "@turf/turf";
import { useEffect, useRef, useState } from "react";

export default function useUserLocation() {
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);

	useEffect(() => {
		if ("geolocation" in navigator) {
			console.log("Available");
		} else {
			console.log("Not Available");
		}
		navigator.geolocation.getCurrentPosition(function (position) {
			setLat(position.coords.latitude);
			setLon(position.coords.longitude);
			// console.log(lat);
			// console.log(long);
		});
	}, [setLat, setLon]);
	let userLocation: number[] = [lon, lat];
	console.log(userLocation);
	return userLocation;
}
