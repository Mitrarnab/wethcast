export type MapLocation = {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  mapUrl: string;
};

export type CurrentWeather = {
  is_day: number;
  condition: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  uv: number;
  pressure: number;
  wind_speed_10m: number;
  weather_code: number;
  sunrise: string;
  sunset: string;
};

export type DailyWeather = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  temperature_2m_avg_c: number[];
  temperature_2m_avg_f: number[];
};

export type HourlyWeather = {
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  wind_kph: number;
  wind_degree: number;
  condition: { code: number; icon: string };
};

export type TomorrowWeather = {
  date: string;
  condition: string;
  code: number;
  temp_c: number;
  temp_f: number;
  sunrise: string;
  sunset: string;
};

export type WeatherData = {
  location: { name: string; lat: number; lon: number };
  current: CurrentWeather;
  tomorrow: TomorrowWeather;
  daily: DailyWeather;
  hourly: HourlyWeather[];
};

export type HeaderProps = {
  onLocationFound?: (location: MapLocation) => void;
  showLocationControls?: boolean;
};

export type FooterProps = {
  showLocationControls?: boolean;
};

export type ForecastProps = CurrentWeather;

export type HourlyForecastProps = {
  hourly: HourlyWeather[];
  timezone?: string;
  unit: TemperatureUnit;
};

export type HourCardProps = {
  hour: HourlyWeather;
  unit: TemperatureUnit;
};

export type TomorrowDataProps = Partial<TomorrowWeather>;

export type TemperatureUnit = "C" | "F";

export type TimeMapProps = {
  location: MapLocation | null;
};
