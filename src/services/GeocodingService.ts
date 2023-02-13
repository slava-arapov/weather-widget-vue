import { getCitiesByLocationName } from "@/services/OpenWeatherAPI";
import { CityResponse } from "@/interfaces/OpenWeatherAPI/CityResponse";
import { CityInfo } from "@/interfaces/CityInfo";

export const getCitiesInfoByLocationName = async (
  name: string
): Promise<Array<CityInfo>> => {
  const searchResult: Array<CityResponse> = await getCitiesByLocationName(name);

  console.log("searchResult", searchResult);

  return searchResult.map((city) => ({
    name: `${city.name}, ${city.country}`,
    lat: city.lat,
    lon: city.lon,
  }));
};
