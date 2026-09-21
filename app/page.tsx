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
        console.log("Geocode response:", defaultLocation);
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
        console.log("Complete weather API response:", data);
      })
      .catch((error) => {
        setWeather(null);
        const message = error instanceof Error ? error.message : "Weather lookup failed.";
        toast.error(message);
      });
  }, [location]);

  return (
    <>
      <Header onLocationFound={setLocation} />
      <main className="px-4 lg:px-2">
        <section className="flex flex-col-reverse lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-12.5 items-stretch">
          <TimeMap location={location} />
          {weather !== null && <Forcast {...weather.current} unit={unit} onUnitChange={setUnit} />}
        </section>
        <section className="flex flex-col my-6 lg:my-12.5 lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-12.5 items-stretch">
          <HourlyForcast hourly={weather?.hourly ?? []} timezone={location?.timezone} unit={unit} />
          <TomorrowData {...weather?.tomorrow} unit={unit} />
        </section>
      </main>
      <Footer />
    </>
  );
}
