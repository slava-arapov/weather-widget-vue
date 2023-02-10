import { OpenWeatherMapResponse } from "@/interfaces/OpenWeatherMapResponse";
import { getBeaufortWindForceScaleName } from "@/helpers/beaufortWindForceScale";
import { getCloudsConditionName } from "@/helpers/cloudsCondition";
import { getDewPoint } from "@/helpers/dewPoint";
import { getWindCardinalDirection } from "@/helpers/windCardinalDirection";
import { WeatherInfo } from "@/interfaces/WeatherInfo";

const OPEN_WEATHER_API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;

export const getOpenWeatherMapResponse = async (
  lon: number,
  lat: number
): Promise<OpenWeatherMapResponse> => {
  const url = getRequestUrl(lon, lat);
  const response = await fetch(url);
  const json = await response.json();

  console.log(json);
  return json;
};

export const getWeatherData = async (
  lon: number,
  lat: number
): Promise<WeatherInfo> => {
  const openWeatherMapResponse = await getOpenWeatherMapResponse(lon, lat);

  return {
    name: `${openWeatherMapResponse.name}, ${openWeatherMapResponse.sys.country}`,
    summary: `${openWeatherMapResponse.weather[0].main}, ${openWeatherMapResponse.weather[0].description}`,
    icon: `//openweathermap.org/img/wn/${openWeatherMapResponse.weather[0].icon}@2x.png`,
    temperatureUnits: "°C",
    speedUnits: "m/s",
    distanceUnits: "km",
    pressureUnits: "hPa",
    temperature: Math.round(openWeatherMapResponse.main.temp),
    temperatureFeelsLike: Math.round(openWeatherMapResponse.main.feels_like),
    cloudsDescription: getCloudsConditionName(
      openWeatherMapResponse.clouds.all
    ),
    windSpeedDescription: getBeaufortWindForceScaleName(
      openWeatherMapResponse.wind.speed
    ),
    windSpeed: openWeatherMapResponse.wind.speed,
    windDirection: openWeatherMapResponse.wind.deg,
    windCardinalDirection: getWindCardinalDirection(
      openWeatherMapResponse.wind.deg
    ),
    pressure: openWeatherMapResponse.main.pressure,
    humidity: openWeatherMapResponse.main.humidity,
    dewPoint: getDewPoint(
      openWeatherMapResponse.main.temp,
      openWeatherMapResponse.main.humidity
    ),
    visibility: openWeatherMapResponse.visibility,
  };
};

function getRequestUrl(lon: number, lat: number) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(
    5
  )}&lon=${lon.toFixed(3)}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
}
