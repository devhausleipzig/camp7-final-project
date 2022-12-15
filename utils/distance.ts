type Coordinate = [number, number];

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number) {
  return (radians / Math.PI) * 180;
}

/**
 * Calculates the distance between two coordinates using the Haversine formula with a reference radius. Accurate to within .5% error or so.
 */
export function haversineDist(
  radius: number,
  [lat1, lon1]: Coordinate,
  [lat2, lon2]: Coordinate
) {
  const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const finalDistance = radius * c;

  return finalDistance;
}

/**
 * Get a bounding rectangle of some radius around a coordinate point using an equilinear approximation. The plane used is centered at the coordinate point and the estimated radius of the Earth at that location.
 *
 * Credit to Drupal Earth Algorithm: https://www.rit.edu/drupal/api/drupal/sites%21all%21modules%21location%21earth.inc/7.54
 *
 * Credit to Sacky San: https://stackoverflow.com/a/45950426
 */
export class BoundingRectangle {
  center: Coordinate;
  radius: number;
  top: number;
  bottom: number;
  left: number;
  right: number;

  constructor(distance: number, center: Coordinate) {
    this.center = center;
    const [latitude, longitude] = center;

    const lat = toRadians(latitude);
    const lon = toRadians(longitude);

    this.radius = this.earthRadius(lat);

    const retLats = this.earthLatitudeRange(lat, this.radius, distance);
    const retLons = this.earthLongitudeRange(lat, lon, this.radius, distance);

    this.top = toDegrees(retLons[0]);
    this.bottom = toDegrees(retLons[1]);
    this.left = toDegrees(retLats[0]);
    this.right = toDegrees(retLats[1]);
  }

  /**
   * Estimate the min and max latitudes within distance of a given location.
   */
  private earthLatitudeRange(
    latitude: number,
    radius: number,
    distance: number
  ) {
    const angle = distance / radius;
    const rightAngle = Math.PI / 2;

    let minLat = latitude - angle;
    let maxLat = latitude + angle;

    // Wrapped around the south pole.
    if (minLat < -rightAngle) {
      const overshoot = -minLat - rightAngle;
      minLat = -rightAngle + overshoot;
      if (minLat > maxLat) {
        maxLat = minLat;
      }
      minLat = -rightAngle;
    }

    // Wrapped around the north pole.
    if (maxLat > rightAngle) {
      const overshoot = maxLat - rightAngle;
      maxLat = rightAngle - overshoot;
      if (maxLat < minLat) {
        minLat = maxLat;
      }
      maxLat = rightAngle;
    }

    return [minLat, maxLat];
  }

  /**
   * Calculate longitude range based on earths radius at a given point
   */
  private earthLongitudeRange(
    lat: number,
    lon: number,
    earthRadius: number,
    distance: number
  ) {
    // Estimate the min and max longitudes within distance of a given location.
    const radius = earthRadius * Math.cos(lat);
    let angle: number;

    if (radius > 0) {
      angle = Math.abs(distance / radius);
      angle = Math.min(angle, Math.PI);
    } else {
      angle = Math.PI;
    }

    let minLon = lon - angle;
    let maxLon = lon + angle;

    if (minLon < -Math.PI) {
      minLon = minLon + Math.PI * 2;
    }

    if (maxLon > Math.PI) {
      maxLon = maxLon - Math.PI * 2;
    }

    return [minLon, maxLon];
  }

  /**
   * Calculate earth's radius at a given latitude.
   */
  private earthRadius(latitude: number) {
    // Default to an approximate average radius for the United States???
    const lat = toRadians(latitude);

    const x = Math.cos(lat) / 6378137.0;
    const y = Math.sin(lat) / (6378137.0 * (1 - 1 / 298.257223563));

    //Make sure earth's radius is in km , not meters
    return 1 / Math.sqrt(x * x + y * y) / 1000;
  }
}
