import { CurrentWeatherResponse } from "@/interfaces/OpenWeatherAPI/CurrentWeatherResponse";
import { CityResponse } from "@/interfaces/OpenWeatherAPI/CityResponse";
const OPEN_WEATHER_API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;

export const getWeatherByCoordinates = async (
  lon: number,
  lat: number
): Promise<CurrentWeatherResponse> => {
  const url = getWeatherByCoordinatesRequestUrl(lon, lat);
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export const getCitiesByLocationName = async (
  cityName: string
): Promise<Array<CityResponse>> => {
  const url = getCitiesByLocationNameRequestUrl(cityName);
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

function getWeatherByCoordinatesRequestUrl(lon: number, lat: number) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
}

function getCitiesByLocationNameRequestUrl(cityName: string, limit = 4) {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${OPEN_WEATHER_API_KEY}`;
}
