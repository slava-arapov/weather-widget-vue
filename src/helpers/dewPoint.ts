export const getDewPoint = (temperature: number, humidity: number): number => {
  // Temperature and Dew Point expressed in °C
  // Most accurate results for temperatures ranging from -45 °C to 60 °C
  // https://www.omnicalculator.com/physics/dew-point#how-to-calculate-dew-point-how-to-calculate-relative-humidity

  const A = 17.625;
  const B = 243.04;

  const relativeHumidity = humidity;

  const alpha =
    Math.log(relativeHumidity / 100) + (A * temperature) / (B + temperature);

  return Math.round((B * alpha) / (A - alpha));
};
