<template>
  <div class="weather-widget">
    <settings-button
      :in-settings-mode="inSettingsMode"
      @close="closeSettings"
      @open="openSettings"
    />
    <weather-settings :locations="locations" v-show="inSettingsMode" />
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
  mounted() {
    // Two stub locations
    this.locations = [...this.locations, getWeatherData()];
    this.locations = [...this.locations, getWeatherData()];
  },
  methods: {
    openSettings() {
      this.inSettingsMode = true;
    },
    closeSettings() {
      this.inSettingsMode = false;
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/fonts.scss";
@import "@/assets/styles/styles.scss";
</style>
