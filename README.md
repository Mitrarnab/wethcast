# WeathCast

WeathCast is a location-aware weather dashboard for reading current conditions and short-term forecasts at a glance. Search for a place, use your browser's current location, and explore the forecast in Celsius or Fahrenheit.

**Live app:** [weathcastbyarnab.vercel.app](https://weathcastbyarnab.vercel.app)

## Features

- Search for a city or place with OpenStreetMap Nominatim.
- Use browser geolocation to load weather for your current position.
- View current temperature, feels-like temperature, condition, humidity, wind, pressure, UV index, sunrise, and sunset.
- Browse the hourly forecast and a summary for tomorrow.
- Switch between Celsius and Fahrenheit.
- Switch between light and dark themes.
- View the selected location on an embedded OpenStreetMap map.
- Resolve the selected location's timezone for local forecast times.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [WeatherAPI.com](https://www.weatherapi.com/) for weather data
- [OpenStreetMap Nominatim](https://nominatim.org/) for geocoding and reverse geocoding
- [geo-tz](https://www.npmjs.com/package/geo-tz) for timezone lookup
- [Lucide](https://lucide.dev/) for interface icons

## Requirements

- Node.js 20 or later
- npm
- A [WeatherAPI.com](https://www.weatherapi.com/) API key

## Getting started

1. Clone the repository and enter the project directory.

   ```bash
   git clone <repository-url>
   cd wethcast
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a local environment file named `.env.local`:

   ```env
   WEATHER_API_KEY=your_weatherapi_key
   ```

   Keep this key server-side. Do not prefix it with `NEXT_PUBLIC_` or commit `.env.local`.

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

The home page initially loads Delhi as the default location. You can then search for another location or use the **Current Location** control. Browser geolocation requires permission and normally works only on `localhost` or HTTPS.

## Commands

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint                   |

## API routes

The browser talks to the app's internal routes, keeping the WeatherAPI key on the server.

| Route                                             | Purpose                                             |
| ------------------------------------------------- | --------------------------------------------------- |
| `GET /api/geocode?query=<place>`                  | Find a place, coordinates, timezone, and map bounds |
| `GET /api/reverse-geocode?lat=<lat>&lon=<lon>`    | Resolve browser coordinates to a place              |
| `GET /api/weather?latitude=<lat>&longitude=<lon>` | Return current, hourly, daily, and tomorrow weather |

The API routes validate input and return JSON errors with appropriate HTTP status codes. Weather responses are cached by Next.js for ten minutes; geocoding responses are cached for one hour.

## Project structure

```text
app/
├── api/                    Server routes for geocoding and weather
├── components/             Dashboard, layout, and forecast components
├── context/                Theme state
├── hooks/                  Client hooks
├── lib/                    Shared constants and TypeScript types
├── about/                  About page
├── globals.css             Global styles and theme variables
├── layout.tsx              Root layout and metadata
└── page.tsx                Main weather dashboard
components/                 Shared UI primitives
public/icons/               Weather and brand assets
```

## Deployment

The project can be deployed to any platform that supports Next.js. For Vercel:

1. Import the repository into Vercel.
2. Add `WEATHER_API_KEY` under the project's Environment Variables.
3. Deploy with the default Next.js build settings.

Do not expose the API key in client-side code or commit environment files containing secrets.

## Data and attribution

- Weather data is provided by [WeatherAPI.com](https://www.weatherapi.com/).
- Search and reverse-geocoding data is provided by [OpenStreetMap Nominatim](https://nominatim.org/).
- The embedded map is provided by [OpenStreetMap](https://www.openstreetmap.org/).

Please follow each provider's terms, usage policy, and attribution requirements when running or extending the project.

## License

No license file is currently included in this repository. Treat the project as all rights reserved unless the repository owner provides separate permission or adds a license.
