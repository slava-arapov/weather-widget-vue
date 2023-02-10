<template>
  <div class="weather-widget">
    <settings-button
      :in-settings-mode="inSettingsMode"
      @close="closeSettings"
      @open="openSettings"
    />
    <weather-settings
      :locations="locations"
      v-show="inSettingsMode"
      @remove="(location) => remove(location)"
    />
    <weather-location
      v-for="location of locations"
      v-show="!inSettingsMode"
      :weather-info="location"
      :key="location.name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SettingsButton from "@/components/SettingsButton.vue";
import WeatherLocation from "@/components/WeatherLocation.vue";
import WeatherSettings from "@/components/WeatherSettings.vue";
import { getWeatherData } from "@/api";
import { WeatherInfo } from "@/interfaces/WeatherInfo";

export default defineComponent({
  name: "WeatherWidget",
  components: {
    SettingsButton,
    WeatherLocation,
    WeatherSettings,
  },
  data() {
    return {
      locations: [] as WeatherInfo[],
      inSettingsMode: false,
    };
  },
  async mounted() {
    // const CITY_NAME = 'London';
    const LON_LONDON = -0.12574;
    const LAT_LONDON = 51.50853;

    // const CITY_NAME = 'Moscow';
    const LON_MOSCOW = 37.615;
    const LAT_MOSCOW = 55.752;

    const londonInfo = await getWeatherData(LON_LONDON, LAT_LONDON);
    const moscowInfo = await getWeatherData(LON_MOSCOW, LAT_MOSCOW);

    this.locations = [...this.locations, londonInfo, moscowInfo];
  },
  methods: {
    openSettings() {
      this.inSettingsMode = true;
    },
    closeSettings() {
      this.inSettingsMode = false;
    },
    remove(location: WeatherInfo) {
      this.locations = this.locations.filter((item) => item !== location);
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/fonts.scss";
@import "@/assets/styles/styles.scss";
</style>
