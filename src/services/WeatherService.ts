import { CurrentWeatherResponse } from "@/interfaces/OpenWeatherAPI/CurrentWeatherResponse";
import { getBeaufortWindForceScaleName } from "@/helpers/beaufortWindForceScale";
import { getCloudsConditionName } from "@/helpers/cloudsCondition";
import { getDewPoint } from "@/helpers/dewPoint";
import { getWindCardinalDirection } from "@/helpers/windCardinalDirection";
import { WeatherInfo } from "@/interfaces/WeatherInfo";
import { getWeatherByCoordinates } from "@/services/OpenWeatherAPI";

export const getWeatherInfo = async (
  lon: number,
  lat: number
): Promise<WeatherInfo> => {
  const openWeatherMapResponse: CurrentWeatherResponse =
    await getWeatherByCoordinates(lon, lat);

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

export const getDefaultLocationsWeatherInfo = async function (): Promise<
  Array<WeatherInfo>
> {
  // London
  const LON_LONDON = -0.12574;
  const LAT_LONDON = 51.50853;

  // Moscow
  const LON_MOSCOW = 37.615;
  const LAT_MOSCOW = 55.752;

  return await Promise.all([
    getWeatherInfo(LON_LONDON, LAT_LONDON),
    getWeatherInfo(LON_MOSCOW, LAT_MOSCOW),
  ]);
};
