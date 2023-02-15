import { defineCustomElement } from "vue";
import { loadFont } from "./helpers/helpers";
import WeatherWidget from "./WeatherWidget.ce.vue";

const WeatherWidgetElement = defineCustomElement(WeatherWidget);

customElements.define("weather-widget", WeatherWidgetElement);

loadFont(
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600&display=swap"
);
