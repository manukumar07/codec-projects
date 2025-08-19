import axios from "axios";

// Your OpenWeather API key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const isDay = (currentTime, sunrise, sunset) => {
  return currentTime >= sunrise && currentTime <= sunset;
};

export const getCurrentWeather = async (city, unit = "celsius") => {
  try {
    const units = unit === "celsius" ? "metric" : "imperial";
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
    );

    const data = response.data;

    return {
      temperature: data.main.temp,
      condition: data.weather[0].description,
      location: data.name,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      feelsLike: data.main.feels_like,
      isDay: isDay(data.dt, data.sys.sunrise, data.sys.sunset),
      pressure: data.main.pressure,
      visibility: data.visibility / 1000,
      sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(data.sys.sunset * 1000).toISOString(),
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error(
      "Failed to fetch weather data. Please check the city name and try again."
    );
  }
};

export const getForecast = async (city, unit = "celsius") => {
  try {
    const units = unit === "celsius" ? "metric" : "imperial";
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
    );

    const dailyForecasts = new Map();

    response.data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      const precipitation = item.rain?.["3h"] || 0;
      const windSpeed = item.wind?.speed || 0;

      if (!dailyForecasts.has(date)) {
        dailyForecasts.set(date, {
          date: new Date(item.dt * 1000).toISOString(),
          condition: item.weather[0].description,
          maxTemp: item.main.temp_max,
          minTemp: item.main.temp_min,
          isDay: true,
          precipitation: precipitation,
          windSpeed: windSpeed,
        });
      } else {
        const existing = dailyForecasts.get(date);
        existing.maxTemp = Math.max(existing.maxTemp, item.main.temp_max);
        existing.minTemp = Math.min(existing.minTemp, item.main.temp_min);
        existing.precipitation += precipitation;
        existing.windSpeed = Math.max(existing.windSpeed, windSpeed);
      }
    });

    // Round values before returning
    return Array.from(dailyForecasts.values())
      .slice(0, 6)
      .map((day) => ({
        ...day,
        precipitation: Math.round(day.precipitation),
        windSpeed: Math.round(day.windSpeed),
      }));
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw new Error("Failed to fetch forecast data.");
  }
};
