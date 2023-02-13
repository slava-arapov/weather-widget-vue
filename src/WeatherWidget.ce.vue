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
      @remove="(location: WeatherInfo) => remove(location)"
      @add="(city: CityInfo) => add(city)"
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
import {
  getDefaultLocationsWeatherInfo,
  getWeatherInfo,
} from "@/services/WeatherService";
import { WeatherInfo } from "@/interfaces/WeatherInfo";
import { CityInfo } from "@/interfaces/CityInfo";

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

    if (this.locations.length === 0) {
      await this.loadDefaultLocations();
    }
  },
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
    async add(city: CityInfo) {
      const alreadyAdded =
        this.locations.filter((location) => location.name === city.name)
          .length > 0;

      if (alreadyAdded) return;

      this.locations = [
        ...this.locations,
        await getWeatherInfo(city.lon, city.lat),
      ];
    },
    async loadDefaultLocations() {
      this.locations = await getDefaultLocationsWeatherInfo();
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/fonts.scss";
@import "@/assets/styles/styles.scss";
</style>
