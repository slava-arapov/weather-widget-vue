<template>
  <weather-location location="London, UK" />
  <weather-location location="Moscow, RU" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherLocation from "./components/WeatherLocation.vue";

export default defineComponent({
  name: "App",
  components: {
    WeatherLocation,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
