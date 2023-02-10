<template>
  <article class="weather-widget__card" v-if="weatherInfo">
    <h2 class="weather-widget__title">
      {{ weatherInfo.name }}
    </h2>
    <div class="weather-widget__main-info">
      <div class="weather-widget__weather-icon">
        <img :src="weatherInfo.icon" :alt="weatherInfo.summary" />
      </div>
      <div class="weather-widget__temperature">
        {{ weatherInfo.temperature }}{{ weatherInfo.temperatureUnits }}
      </div>
    </div>
    <p class="weather-widget__additional-info">
      {{ feelsLikePhrase }}. {{ cloudsPhrase }}. {{ windPhrase }}.
    </p>
    <div class="weather-widget__details">
      <div class="weather-widget__detail">
        <font-awesome-icon
          :icon="faLocationArrow"
          class="weather-widget__detail-icon"
          :style="windDirectionIconStyle"
        />
        {{ weatherInfo.windSpeed }}{{ weatherInfo.speedUnits }},
        {{ weatherInfo.windCardinalDirection }}
      </div>
      <div class="weather-widget__detail">
        <font-awesome-icon
          :icon="faGaugeSimpleHigh"
          class="weather-widget__detail-icon"
        />
        {{ weatherInfo.pressure }}{{ weatherInfo.pressureUnits }}
      </div>
      <div class="weather-widget__detail">
        Humidity: {{ weatherInfo.humidity }}%
      </div>
      <div class="weather-widget__detail">
        Dew point: {{ weatherInfo.dewPoint }}{{ weatherInfo.temperatureUnits }}
      </div>
      <div class="weather-widget__detail">
        Visibility: {{ formattedVisibility }}{{ weatherInfo.distanceUnits }}
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WeatherInfo } from "@/interfaces/WeatherInfo";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faGaugeSimpleHigh,
  faGear,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  name: "WeatherLocation",
  props: {
    weatherInfo: {
      type: Object as PropType<WeatherInfo>,
      required: true,
    },
  },
  data() {
    return {
      faGaugeSimpleHigh,
      faLocationArrow,
      faGear,
    };
  },
  computed: {
    feelsLikePhrase() {
      return `Feels like ${this.weatherInfo.temperatureFeelsLike}${this.weatherInfo.temperatureUnits}`;
    },
    cloudsPhrase() {
      return capitalizeFirstLetter(this.weatherInfo.cloudsDescription);
    },
    windPhrase() {
      return capitalizeFirstLetter(this.weatherInfo.windSpeedDescription);
    },
    windDirectionIconStyle() {
      const ICON_ROTATED_BY_DEFAULT = 45; // 45° clockwise for FA icon

      const transformRotate =
        this.weatherInfo.windDirection - ICON_ROTATED_BY_DEFAULT;

      return {
        transform: `rotate(${transformRotate}deg)`,
      };
    },
    formattedVisibility() {
      return (this.weatherInfo.visibility / 1000).toFixed(1);
    },
  },
  components: {
    FontAwesomeIcon,
  },
});

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>
