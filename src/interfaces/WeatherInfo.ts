export interface WeatherInfo {
  name: string;
  lon: number;
  lat: number;
  summary: string;
  icon: string;
  temperatureUnits: string;
  speedUnits: string;
  distanceUnits: string;
  pressureUnits: string;
  temperature: number;
  temperatureFeelsLike: number;
  cloudsDescription: string;
  windSpeedDescription: string;
  windSpeed: number;
  windDirection: number;
  windCardinalDirection: string;
  pressure: number;
  humidity: number;
  dewPoint: number;
  visibility: number;
}
