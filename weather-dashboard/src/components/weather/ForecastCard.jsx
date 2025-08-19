import { Card } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";
import { CloudRain, Wind } from "lucide-react";

const ForecastCard = ({ forecast, unit, index }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTemperature = (temp) => {
    return `${Math.round(temp)}°`;
  };

  const convertWindSpeed = (speed) => {
    if (unit === "fahrenheit") {
      return `${Math.round(speed * 2.237)} mph`;
    }
    return `${Math.round(speed)} m/s`;
  };

  return (
    <Card
      className={`
        p-6 rounded-2xl transition-all duration-500 
        hover:scale-105 hover:shadow-xl hover:-translate-y-2
        animate-fade-in min-w-[160px] group cursor-pointer
        border-2 border-transparent hover:border-[#2563EB]/20
        bg-[#FFFFFF] text-[#111827] font-poppins
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-center space-y-4">
        {/* Date */}
        <div className="space-y-1">
          <div className="font-semibold text-sm text-[#111827]">
            {formatDate(forecast.date)}
          </div>
          <div
            className="h-0.5 w-8 bg-[#2563EB]/30 mx-auto rounded-full 
            group-hover:w-12 group-hover:bg-[#2563EB]/60 
            transition-all duration-300"
          />
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center transform group-hover:scale-110 transition-transform duration-300">
          <WeatherIcon
            condition={forecast.condition}
            isDay={forecast.isDay}
            size={48}
            className="text-[#2563EB] mx-auto drop-shadow-lg animate-bounce"
          />
        </div>

        {/* Condition */}
        <div className="text-xs capitalize font-medium leading-tight text-[#9CA3AF]">
          {forecast.condition}
        </div>

        {/* Temperatures */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-[#111827]">
              {formatTemperature(forecast.maxTemp)}
            </span>
            <span className="text-md text-[#454546]">
              {formatTemperature(forecast.minTemp)}
            </span>
          </div>

          {/* Temperature range bar */}
          <div className="w-full h-1.5 bg-[#9CA3AF]/30 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transform origin-left group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-[#3B82F6] via-[#F59E0B] to-[#DC2626]"
              style={{
                width: `${Math.min(
                  100,
                  ((forecast.maxTemp - forecast.minTemp) / 30) * 100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Additional Weather Info */}
        <div className="flex justify-between items-center text-md text-[#9CA3AF] space-x-2">
          {forecast.precipitation !== undefined && (
            <div className="flex items-center space-x-1">
              <CloudRain size={16} className="text-[#3B82F6]" />
              <span>{forecast.precipitation}%</span>
            </div>
          )}
          {forecast.windSpeed !== undefined && (
            <div className="flex items-center space-x-1">
              <Wind size={16} className="text-[#6B7280]" />
              <span className="text-sm">
                {unit === "fahrenheit"
                  ? convertWindSpeed(forecast.windSpeed)
                  : Math.round(forecast.windSpeed)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ForecastCard;
