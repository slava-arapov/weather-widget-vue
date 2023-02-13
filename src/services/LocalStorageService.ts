import { WeatherInfo } from "@/interfaces/WeatherInfo";

const LOCAL_STORAGE_ITEM_NAME = "weather-widget-locations";

export const loadLocations = function (): Array<WeatherInfo> {
  const locations = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);

  if (locations) {
    return JSON.parse(locations);
  }

  return [];
};

export const saveLocations = function (locations: Array<WeatherInfo>): void {
  localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(locations));
};
