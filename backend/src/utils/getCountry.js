import * as turf from "@turf/turf";
import fs from "node:fs";

const countiesGeoJSON = JSON.parse(
  fs.readFileSync(new URL("../../new-york-counties.geojson", import.meta.url)),
);
function getCounty(lat, lng) {
  const point = turf.point([lng, lat]);
  for (const feature of countiesGeoJSON.features) {
    const polygon = feature.geometry;
    if (turf.booleanPointInPolygon(point, polygon)) {
      return feature.properties.name;
    }
  }
  return null;
}

export default getCounty;
