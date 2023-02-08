<template>
  <h3>{{ location }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherLocation",
  props: {
    location: String,
  },
});
</script>

<style scoped lang="scss">
h3 {
  font-weight: bold;
  color: #42b983;
}
</style>
