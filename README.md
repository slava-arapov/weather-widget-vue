# weather-widget-vue

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
