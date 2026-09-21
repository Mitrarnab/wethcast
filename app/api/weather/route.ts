import { NextRequest, NextResponse } from "next/server";

interface GeoResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface WeatherApiResponse {
  error?: { message?: string };
  current: {
    temp_c: number;
    temp_f: number;
    is_day: number;
    feelslike_c: number;
    feelslike_f: number;
    humidity: number;
    uv: number;
    pressure_mb: number;
    wind_kph: number;
    condition: { text: string; code: number };
  };
  forecast: {
    forecastday: {
      date: string;
      astro: {
        sunrise: string;
        sunset: string;
      };
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        avgtemp_f: number;
        date: string;
        condition: { text: string; code: number };
      };
      hour: {
        is_day: number;
        time: string;
        temp_c: number;
        wind_kph: number;
        condition: { code: number };
      }[];
    }[];
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  if ((!latitude || !longitude) && !query) {
    return NextResponse.json(
      { error: 'Provide "q" or both "latitude" and "longitude" parameters' },
      { status: 400 },
    );
  }

  try {
    let lat = latitude;
    let lon = longitude;
    let display_name = query ?? "Selected location";

    if (!lat || !lon) {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query!,
        )}&format=json&limit=1`,
        { headers: { "User-Agent": "WeathCast/1.0" } },
      );

      if (!geoRes.ok) {
        return NextResponse.json(
          { error: "Geocoding request failed" },
          { status: 502 },
        );
      }

      const geoData: GeoResult[] = await geoRes.json();
      if (geoData.length === 0) {
        return NextResponse.json(
          { error: `No location found for "${query}"` },
          { status: 404 },
        );
      }

      lat = geoData[0].lat;
      lon = geoData[0].lon;
      display_name = geoData[0].display_name;
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "WEATHER_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const area = `${lat},${lon}`;
    const weatherRes = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(area)}&aqi=yes&alerts=yes&days=2`,
    );

    const weatherData: WeatherApiResponse = await weatherRes.json();
    if (!weatherRes.ok) {
      return NextResponse.json(
        { error: weatherData.error?.message || "Weather request failed" },
        { status: 502 },
      );
    }

    const dayOne = weatherData.forecast.forecastday[0];
    const dayTwo = weatherData.forecast.forecastday[1] ?? dayOne;

    const currentWeather = {
      is_day: weatherData.current.is_day,
      temp_c: weatherData.current.temp_c,
      temp_f: weatherData.current.temp_f,
      sunrise: dayOne.astro.sunrise,
      sunset: dayOne.astro.sunset,
      feelslike_c: weatherData.current.feelslike_c,
      feelslike_f: weatherData.current.feelslike_f,
      condition: weatherData.current.condition.text,
      pressure: weatherData.current.pressure_mb,
      humidity: weatherData.current.humidity,
      uv: weatherData.current.uv,
      wind_speed_10m: weatherData.current.wind_kph,
      weather_code: weatherData.current.condition.code,
    };
    const daily = weatherData.forecast.forecastday;
    const hourly = daily.flatMap(({ hour }) => hour);

    // 3. Combine and return
    return NextResponse.json({
      location: {
        name: display_name,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      },
      current: currentWeather,
      tomorrow: {
        date: dayTwo.date,
        condition: dayTwo.day.condition.text,
        code: dayTwo.day.condition.code,
        temp_c: dayTwo.day.avgtemp_c,
        temp_f: dayTwo.day.avgtemp_f,
        sunrise: dayTwo.astro.sunrise,
        sunset: dayTwo.astro.sunset,
      },
      daily: {
        time: daily.map(({ date }) => date),
        temperature_2m_max: daily.map(({ day }) => day.maxtemp_c),
        temperature_2m_min: daily.map(({ day }) => day.mintemp_c),
        temperature_2m_avg_c: daily.map(({ day }) => day.avgtemp_c),
        temperature_2m_avg_f: daily.map(({ day }) => day.avgtemp_f),
      },
      hourly,
    });
  } catch (err) {
    console.error("Weather API error:", err);
    return NextResponse.json(
      { error: "Something went wrong fetching weather data" },
      { status: 500 },
    );
  }
}
