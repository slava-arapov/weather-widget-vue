import { shallowMount } from "@vue/test-utils";
import WeatherLocation from "@/components/WeatherLocation.vue";

describe("WeatherLocation.vue", () => {
  it("renders props.location when passed", () => {
    const location = "London, UK";
    const wrapper = shallowMount(WeatherLocation, {
      props: { location },
    });
    expect(wrapper.text()).toMatch(location);
  });
});
