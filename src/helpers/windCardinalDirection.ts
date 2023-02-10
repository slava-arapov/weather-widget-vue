export const getWindCardinalDirection = (num: number): string => {
  // https://stackoverflow.com/a/25867068/1226073

  const val = Math.round(num / 22.5 + 0.5);

  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  return arr[val % 16];
};
