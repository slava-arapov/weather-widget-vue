<template>
  <div class="weather-widget__loading">
    <img
      src="@fortawesome/fontawesome-free/svgs/solid/sun.svg"
      class="icon icon_rotate"
      alt="Sun spinning"
      v-if="isDayTime"
    />
    <img
      src="@fortawesome/fontawesome-free/svgs/solid/star.svg"
      class="icon icon_rotate"
      alt="Star spinning"
      v-else
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingSpinner",
  data() {
    return {
      isDayTime: true,
    };
  },
  mounted() {
    const hours = new Date().getHours();

    this.isDayTime = hours > 6 && hours < 20;
  },
});
</script>
