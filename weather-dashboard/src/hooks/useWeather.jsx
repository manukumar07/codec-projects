import { useState, useEffect } from "react";

import { getCurrentWeather, getForecast } from "@/services/weatherService";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("celsius");

  // Initialize with saved city if available
  useEffect(() => {
    const savedCity = localStorage.getItem("weatherCity");
    if (savedCity) {
      fetchWeatherByCity(savedCity);
    }
  }, [unit]);

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city, unit),
        getForecast(city, unit),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      localStorage.setItem("weatherCity", city);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = (condition) => {
    const conditionLower = condition?.toLowerCase() || "";

    if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
      return "weather-gradient-sunny";
    }
    if (conditionLower.includes("cloud")) {
      return "weather-gradient-cloudy";
    }
    if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle") ||
      conditionLower.includes("shower")
    ) {
      return "weather-gradient-rainy";
    }
    if (
      conditionLower.includes("storm") ||
      conditionLower.includes("thunder")
    ) {
      return "weather-gradient-stormy";
    }
    if (conditionLower.includes("snow")) {
      return "weather-gradient-snowy";
    }
    if (conditionLower.includes("night")) {
      return "weather-gradient-clear-night";
    }

    return "weather-gradient-default";
  };

  return {
    weather,
    forecast,
    loading,
    error,
    unit,
    setUnit,
    fetchWeatherByCity,
    getBackgroundClass: weather
      ? getBackgroundClass(weather.condition)
      : "weather-gradient-default",
  };
};
