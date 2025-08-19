import { Card } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";
import {
  Droplets,
  Wind,
  Eye,
  Thermometer,
  Gauge,
  Sun,
  Sunset,
} from "lucide-react";

const WeatherCard = ({ weather, unit }) => {
  const getTemperatureColor = (temp) => {
    if (unit === "fahrenheit") {
      if (temp >= 86) return "text-[#DC2626]";
      if (temp >= 68) return "text-[#F59E0B]";
      if (temp >= 50) return "text-[#10B981]";
      if (temp >= 32) return "text-[#3B82F6]";
      return "text-[#1E3A8A]"; // cold
    } else {
      if (temp >= 30) return "text-[#DC2626]";
      if (temp >= 20) return "text-[#F59E0B]";
      if (temp >= 10) return "text-[#10B981]";
      if (temp >= 0) return "text-[#3B82F6]";
      return "text-[#1E3A8A]";
    }
  };

  const formatTemperature = (temp) =>
    `${Math.round(temp)}°${unit === "celsius" ? "C" : "F"}`;

  const convertWindSpeed = (speed) => {
    if (unit === "fahrenheit") {
      return `${Math.round(speed * 2.237)} mph`;
    }
    return `${Math.round(speed)} m/s`;
  };

  const formatTime = (timeString) =>
    new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <Card className="p-8 rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-slide-up group bg-[#FFFFFF]">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="font-poppins text-3xl font-bold text-[#111827] tracking-tight">
            {weather.location}
          </h2>
          <p className="capitalize text-lg font-medium text-[#3c4048]">
            {weather.condition}
          </p>
          <div className="text-md text-[#2c2d2e] ">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Main Temperature */}
        <div className="flex items-center justify-center space-x-8 ">
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            <WeatherIcon
              condition={weather.condition}
              isDay={weather.isDay}
              size={100}
              className="text-[#2563EB] drop-shadow-lg animate-bounce"
            />
          </div>
          <div className="text-center">
            <div
              className={`font-poppins text-7xl font-black tracking-tight ${getTemperatureColor(
                weather.temperature
              )} drop-shadow-lg`}
            >
              {Math.round(weather.temperature)}°
            </div>
            <div className="text-lg font-medium mt-2 text-[#6B7280]">
              Feels like {formatTemperature(weather.feelsLike)}
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-6">
          {/* Primary */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors duration-200">
              <div className="p-2 rounded-xl bg-[#DBEAFE]">
                <Droplets className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#111827]">
                  {weather.humidity}%
                </div>
                <div className="text-sm font-medium text-[#6B7280]">
                  Humidity
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors duration-200">
              <div className="p-2 rounded-xl bg-[#DBEAFE]">
                <Wind className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#111827]">
                  {convertWindSpeed(weather.windSpeed)}
                </div>
                <div className="text-sm font-medium text-[#6B7280]">
                  Wind Speed
                </div>
              </div>
            </div>
          </div>

          {/* Secondary */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {weather.pressure && (
              <div className="flex flex-col items-center p-3 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors duration-200">
                <Gauge className="w-4 h-4 text-[#2563EB] mb-1" />
                <div className="text-lg font-semibold text-[#111827]">
                  {weather.pressure}
                </div>
                <div className="text-xs text-[#6B7280]">hPa</div>
              </div>
            )}
            {weather.visibility && (
              <div className="flex flex-col items-center p-3 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors duration-200">
                <Eye className="w-4 h-4 text-[#2563EB] mb-1" />
                <div className="text-lg font-semibold text-[#111827]">
                  {weather.visibility}
                </div>
                <div className="text-xs text-[#6B7280]">km</div>
              </div>
            )}
            <div className="flex flex-col items-center p-3 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors duration-200">
              <Thermometer className="w-4 h-4 text-[#2563EB] mb-1" />
              <div className="text-lg font-semibold text-[#111827]">
                {Math.round(weather.feelsLike)}°
              </div>
              <div className="text-xs text-[#6B7280]">Real Feel</div>
            </div>
          </div>

          {/* Sun Times */}
          {(weather.sunrise || weather.sunset) && (
            <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-[#FFEDD5]/50 to-[#DBEAFE]/50 border border-[#E5E7EB]">
              {weather.sunrise && (
                <div className="flex items-center space-x-2">
                  <Sun className="w-5 h-5 text-[#F59E0B]" />
                  <div>
                    <div className="text-sm font-medium text-[#111827]">
                      {formatTime(weather.sunrise)}
                    </div>
                    <div className="text-xs text-[#6B7280]">Sunrise</div>
                  </div>
                </div>
              )}
              {weather.sunset && (
                <div className="flex items-center space-x-2">
                  <Sunset className="w-5 h-5 text-[#DC2626]" />
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#111827]">
                      {formatTime(weather.sunset)}
                    </div>
                    <div className="text-xs text-[#6B7280]">Sunset</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
