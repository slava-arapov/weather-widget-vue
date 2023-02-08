import { defineCustomElement } from "vue";
import WeatherWidget from "./WeatherWidget.ce.vue";

const WeatherWidgetElement = defineCustomElement(WeatherWidget);

customElements.define("weather-widget", WeatherWidgetElement);
