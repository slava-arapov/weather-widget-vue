<template>
  <div class="weather-widget__loading">
    <font-awesome-icon :icon="icon" class="icon icon_rotate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSun,
  faStar,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  name: "LoadingSpinner",
  data() {
    return {
      isDayTime: true,
    };
  },
  computed: {
    icon(): IconDefinition {
      return this.isDayTime ? faSun : faStar;
    },
  },
  mounted() {
    const hours = new Date().getHours();

    this.isDayTime = hours > 6 && hours < 20;
  },
  components: {
    FontAwesomeIcon,
  },
});
</script>
