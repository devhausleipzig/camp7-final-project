import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function UserLocation() {
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
			console.log(lat);
			console.log(lon);
		});
	}, [setLat, setLon]);

	axios
		.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1IjoicmVhbGx5Ym9hcmQiLCJhIjoiY2xhdXd6Yzd4MDA2ZTNvbHR5dGlrbzlhZyJ9.-VLPpmZjVi5zq_eeM-Q5yA`
		)
		.then(({ data }) => {
			console.log(data);
		});
	let userLocation: number[] = [lon, lat];
	console.log(userLocation);
	return <button onClick={UserLocation}>Get Location</button>;
}
