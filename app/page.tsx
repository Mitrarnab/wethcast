"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import TimeMap from "./components/layout/TimeMap/TimeMap";
import Forcast from "./components/layout/Forcast/Forcast";
import type { MapLocation, TemperatureUnit, WeatherData } from "./lib/types";
import TomorrowData from "./components/layout/TomorrowData/TomorrowData";
import HourlyForcast from "./components/layout/HourlyForcast/HourlyForcast";
import { ForecastSkeleton } from "./components/layout/Forcast/Forcast";
import { HourlyForecastSkeleton } from "./components/layout/HourlyForcast/HourlyForcast";
import { TomorrowSkeleton } from "./components/layout/TomorrowData/TomorrowData";

export default function Home() {
  const [location, setLocation] = useState<MapLocation | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>("C");

  useEffect(() => {
    fetch(`/api/geocode?query=${encodeURIComponent("Delhi")}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Location lookup failed.");
        return data;
      })
      .then((defaultLocation) => {
        if (defaultLocation) setLocation(defaultLocation);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Location lookup failed.");
      });
  }, []);

  useEffect(() => {
    if (!location) return;

    fetch(`/api/weather?latitude=${location.latitude}&longitude=${location.longitude}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Weather lookup failed.");
        return data;
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        setWeather(null);
        const message = error instanceof Error ? error.message : "Weather lookup failed.";
        toast.error(message);
      });
  }, [location]);

  const weatherForLocation = weather?.location.lat === location?.latitude && weather?.location.lon === location?.longitude
    ? weather
    : null;

  return (
    <>
      <Header onLocationFound={setLocation} />
      <main aria-labelledby="dashboard-heading" className="px-4 lg:px-2">
        <h1 id="dashboard-heading" className="sr-only">Local weather forecast dashboard</h1>
        <section className="flex flex-col-reverse lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-12.5 items-stretch">
          <TimeMap location={location} />
          {weatherForLocation !== null ? <Forcast {...weatherForLocation.current} unit={unit} onUnitChange={setUnit} /> : <ForecastSkeleton />}
        </section>
        <section className="flex flex-col my-6 lg:my-12.5 lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-12.5 items-stretch">
          {weatherForLocation !== null ? <HourlyForcast hourly={weatherForLocation.hourly} timezone={location?.timezone} unit={unit} /> : <HourlyForecastSkeleton />}
          {weatherForLocation !== null ? <TomorrowData {...weatherForLocation.tomorrow} unit={unit} /> : <TomorrowSkeleton />}
        </section>
      </main>
      <Footer />
    </>
  );
}
