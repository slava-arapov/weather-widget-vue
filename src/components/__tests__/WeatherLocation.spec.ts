import { shallowMount } from "@vue/test-utils";
import WeatherLocation from "@/components/WeatherLocation.vue";

describe("WeatherLocation.vue", () => {
  it("renders props.location when passed", () => {
    const weatherInfo = {
      name: "London, UK",
      summary: "moderate rain",
      icon: `http://openweathermap.org/img/wn/10d@2x.png`,
      temperatureUnits: "℃",
      speedUnits: "m/s",
      distanceUnits: "km",
      pressureUnits: "hPa",
      temperature: 298.48,
      temperatureFeelsLike: 298.74,
      cloudsDescription: "broken clouds",
      windSpeedDescription: "light breeze",
      windSpeed: 0.62,
      windDirection: 349,
      pressure: 1015,
      humidity: 64,
      dewPoint: 0,
      visibility: 10.0,
    };

    const wrapper = shallowMount(WeatherLocation, {
      props: { weatherInfo },
    });

    expect(wrapper.text()).toMatch(weatherInfo.name);
  });
});
