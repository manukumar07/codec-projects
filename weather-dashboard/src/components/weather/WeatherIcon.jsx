import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Moon,
  CloudDrizzle,
  Wind,
  CloudFog,
} from "lucide-react";

const WeatherIcon = ({
  condition,
  isDay = true,
  size = 48,
  className = "",
}) => {
  const getIcon = () => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("clear")) return isDay ? Sun : Moon;

    if (
      conditionLower.includes("cloud") &&
      (conditionLower.includes("few") || conditionLower.includes("scattered"))
    )
      return Cloud;

    if (conditionLower.includes("cloud")) return Cloud;

    if (conditionLower.includes("rain") || conditionLower.includes("shower"))
      return CloudRain;

    if (conditionLower.includes("drizzle")) return CloudDrizzle;

    if (conditionLower.includes("snow")) return CloudSnow;

    if (conditionLower.includes("storm") || conditionLower.includes("thunder"))
      return CloudLightning;

    if (conditionLower.includes("mist") || conditionLower.includes("fog"))
      return CloudFog;

    if (conditionLower.includes("wind")) return Wind;

    return isDay ? Sun : Moon;
  };

  const getColor = () => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("clear")) return "text-[#F59E0B]";
    if (conditionLower.includes("cloud")) return "text-[#9CA3AF]";
    if (
      conditionLower.includes("rain") ||
      conditionLower.includes("shower") ||
      conditionLower.includes("drizzle")
    )
      return "text-[#3B82F6]";
    if (conditionLower.includes("storm") || conditionLower.includes("thunder"))
      return "text-[#DC2626]";
    if (conditionLower.includes("snow")) return "text-[#FFFFFF]";
    if (conditionLower.includes("mist") || conditionLower.includes("fog"))
      return "text-[#6B7280]";
    if (conditionLower.includes("wind")) return "text-[#10B981]";

    return isDay ? "text-[#F59E0B]" : "text-[#111827]";
  };

  const IconComponent = getIcon();
  const colorClass = getColor();

  return (
    <div
      className={`inline-block transition-transform duration-300 hover:scale-125 hover:rotate-3 ${className}`}
    >
      <IconComponent size={size} className={colorClass} />
    </div>
  );
};

export default WeatherIcon;
