<template>
  <div class="card">
    <h2 class="card__title">No locations added</h2>
    <p>
      Please add your city
      <a href="" @click.prevent="$emit('open')">in settings</a>.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoLocationsTip",
  emits: {
    open: null,
  },
});
</script>
