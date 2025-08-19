import toast from "react-hot-toast";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/weather/SearchBar";
import WeatherCard from "@/components/weather/WeatherCard";
import ErrorMessage from "@/components/weather/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import ForecastCard from "@/components/weather/ForecastCard";
import { useWeather } from "@/hooks/useWeather";
import Footer from "@/components/layout/Footer";

const Home = () => {
  const {
    weather,
    forecast,
    loading,
    error,
    unit,
    setUnit,
    fetchWeatherByCity,
    getBackgroundClass,
  } = useWeather();

  const handleSearch = async (city) => {
    await fetchWeatherByCity(city);
    if (error) {
      toast.error(error);
    } else {
      toast.success(`Weather loaded for ${city}`);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${getBackgroundClass}`}
    >
      {/* glass background overlay */}
      <div className="min-h-screen backdrop-blur-sm bg-[#0000001A]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <Header unit={unit} onToggle={setUnit} />

          {/* Search */}
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>

          {/* Error / Loading */}
          {error && <ErrorMessage error={error} />}
          {loading && <LoadingSpinner />}

          {!weather && !loading && !error && (
            <div className="flex flex-col items-center justify-center mt-20 space-y-4 text-center animate-fadeIn">
              {/* Weather Icon */}
              <span className="text-6xl animate-bounce">🔍</span>

              {/* Main Message */}
              <h2 className="text-2xl font-bold text-gray-800">
                Search for a city to get started!
              </h2>

              {/* Supporting Text */}
              <p className="text-gray-500 max-w-md">
                Enter the name of any city in the search bar above to see the
                current weather and a 6-day forecast.
              </p>

              {/* Call-to-Action */}
              <p
                className="text-blue-500 font-medium cursor-pointer hover:underline"
                onClick={() => toast("Type a city name and hit enter!")}
              >
                Need help? Click here for tips.
              </p>
            </div>
          )}

          {/* Current Weather */}
          {weather && !loading && (
            <div className="mb-12 max-w-xl mx-auto animate-accordion-down">
              <WeatherCard weather={weather} unit={unit} />
            </div>
          )}

          {/* 6-Day Forecast */}
          {forecast.length > 0 && !loading && (
            <div className="max-w-8xl mx-auto animate-accordion-down">
              <div className="text-center mb-8">
                <h2 className="font-poppins text-3xl font-bold text-[#111827] mb-2">
                  6-Day Forecast
                </h2>
                <p className="text-[#9CA3AF] text-sm">
                  Extended weather outlook for the week ahead
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
                {forecast.map((day, index) => (
                  <ForecastCard
                    key={index}
                    forecast={day}
                    unit={unit}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
