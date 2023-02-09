import { OpenWeatherMapResponse } from "@/interfaces/OpenWeatherMapResponse";
import { WeatherInfo } from "./interfaces/WeatherInfo";

export const getOpenWeatherMapResponse = (): OpenWeatherMapResponse =>
  JSON.parse(` {
    "coord": {
      "lon": -2.15,
      "lat": 57
    },
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 8.48,
      "feels_like": 4.9,
      "temp_min": 8.18,
      "temp_max": 9.26,
      "pressure": 1016,
      "humidity": 79,
      "sea_level": 1016,
      "grnd_level": 1016
    },
    "visibility": 10000,
    "wind": {
      "speed": 7.3,
      "deg": 189,
      "gust": 13.48
    },
    "clouds": {
      "all": 100
    },
    "dt": 1647347424,
    "sys": {
      "type": 2,
      "id": 2031790,
      "country": "GB",
      "sunrise": 1647325488,
      "sunset": 1647367827
    },
    "timezone": 0,
    "id": 2641549,
    "name": "Newtonhill",
    "cod": 200
  }`);

export const getWeatherData = (): WeatherInfo => {
  const openWeatherMapResponse = getOpenWeatherMapResponse();

  return {
    name: `${openWeatherMapResponse.name}, ${openWeatherMapResponse.sys.country}`,
    summary: `${openWeatherMapResponse.weather[0].main}, ${openWeatherMapResponse.weather[0].description}`,
    icon: `//openweathermap.org/img/wn/${openWeatherMapResponse.weather[0].icon}@2x.png`,
    temperatureUnits: "°C",
    speedUnits: "m/s",
    distanceUnits: "km",
    pressureUnits: "hPa",
    temperature: Math.round(openWeatherMapResponse.main.temp),
    cloudsDescription: "broken clouds", // TODO Get description by %
    windSpeedDescription: "light breeze", // TODO Get description by speed
    temperatureFeelsLike: Math.round(openWeatherMapResponse.main.feels_like),
    windSpeed: openWeatherMapResponse.wind.speed,
    windDirection: openWeatherMapResponse.wind.deg,
    pressure: openWeatherMapResponse.main.pressure,
    humidity: openWeatherMapResponse.main.humidity,
    dewPoint: 0, // TODO Calculate Dew Point
    visibility: 10.0, // TODO Calculate visibility
  };
};
