# weather-widget-vue

A Vue custom element widget shows current weather for a website visitors's city and other cities.

![widget screenshot](https://i.imgur.com/fCCWMsj.png)

## Usage

Compile widget, deploy and insert this code into an HTML-page:

```html
<weather-widget />
<script type="text/javascript" src="/path/to/weather-widget.js"></script>
```

You can also use the widget deployed on GitHub Pages but it uses a free API subscription plan and may suddenly stop working.

```html
<weather-widget />
<script
  type="text/javascript"
  src="https://weather-widget-vue.arapov.net/js/weather-widget.js"
></script>
```

## Features and dependencies

- Vue.js 3 (Options API), Typescript, Webpack
- Get current weather via [OpenWeather Current Weather Data API](https://openweathermap.org/current)
- Get extra information such as clouds condition, Beaufort scale wind type, wind direction and dew point
- Search and add cities using [OpenWeather Geocoding API](https://openweathermap.org/api/geocoding-api)
- Remove and reorder cities
- Store cities list in localStorage
- Display current user's location weather

## Project setup

1. Clone the repository

   ```bash
   git clone https://github.com/slava-arapov/weather-widget-vue.git
   cd weather-widget-vue
   ```

1. Copy your .env file for local development or production

   ```bash
    cp .env.example .env.local
   ```

1. Edit your .env.local file. Make sure your [OpenWeather API key](https://home.openweathermap.org/api_keys) and public path (optional, for icons absolute URLs) added

   ```dotenv
   OPEN_WEATHER_API_KEY=
   PUBLIC_PATH=https://example.com/
   ```

1. Install dependencies
   ```bash
   npm install
   ```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```
