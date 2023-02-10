export const getCloudsConditionName = (percent: number): string => {
  // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

  if (percent < 11) return "clear sky";
  if (percent < 25) return "few clouds";
  if (percent < 51) return "scattered clouds";
  if (percent < 85) return "broken clouds";

  return "overcast clouds";
};
