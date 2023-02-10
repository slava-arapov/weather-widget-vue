export const getBeaufortWindForceScaleName = (speed: number): string => {
  // https://en.wikipedia.org/wiki/Beaufort_scale#Modern_scale
  // https://openweathermap.org/themes/openweathermap/assets/vendor/mosaic/data/wind-speed-new-data.json

  if (speed < 0.5) return "Calm";
  if (speed < 1.6) return "Light air";
  if (speed < 3.4) return "Light breeze";
  if (speed < 5.5) return "Gentle breeze";
  if (speed < 8.0) return "Moderate breeze";
  if (speed < 10.8) return "Fresh breeze";
  if (speed < 13.9) return "Strong breeze";
  if (speed < 17.2) return "High wind, near gale";
  if (speed < 20.8) return "Gale";
  if (speed < 24.5) return "Severe gale";
  if (speed < 28.5) return "Storm";
  if (speed < 32.7) return "Violent storm";

  return "Hurricane";
};
