<template>
  <div class="weather-widget">
    <weather-settings :locations="locations" />
    <weather-location
      v-for="location of locations"
      :weather-info="location"
      :key="location.name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherLocation from "@/components/WeatherLocation.vue";
import WeatherSettings from "@/components/WeatherSettings.vue";
import { getWeatherData } from "@/api";
import { WeatherInfo } from "@/interfaces/WeatherInfo";

export default defineComponent({
  name: "WeatherWidget",
  components: {
    WeatherLocation,
    WeatherSettings,
  },
  data() {
    return {
      locations: [] as WeatherInfo[],
    };
  },
  mounted() {
    // Two stub locations
    this.locations = [...this.locations, getWeatherData()];
    this.locations = [...this.locations, getWeatherData()];
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/fonts.scss";
@import "@/assets/styles/styles.scss";
</style>
