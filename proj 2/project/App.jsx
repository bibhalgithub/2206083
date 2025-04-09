import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ThemeToggle from './components/ThemeToggle';
import useWeatherAPI from './hooks/useWeatherAPI';

export default function App() {
  const [city, setCity] = useState('');
  const [recentCities, setRecentCities] = useState([]);
  const { data, forecastData, error, loading, fetchWeather } = useWeatherAPI();

  const handleFetch = () => {
    if (!city) return;
    fetchWeather(city);

    // Save recent searches (limit to last 5, avoid duplicates)
    setRecentCities((prev) => {
      const updated = [city, ...prev.filter((c) => c !== city)];
      return updated.slice(0, 5);
    });
  };

  return (
    <div className="min-h-screen bg-sky-200 dark:bg-blue-950 flex flex-col items-center justify-center p-4 text-gray-800 dark:text-white transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center mb-6 flex items-center gap-2">
        🌤️ Weather Dashboard
      </h1>

      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        <SearchBar city={city} setCity={setCity} fetchWeather={handleFetch} />

        {/* Recent searches */}
        {recentCities.length > 0 && (
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-1 font-semibold">Recent Searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {recentCities.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCity(item);
                    fetchWeather(item);
                  }}
                  className="bg-white text-sm px-3 py-1 rounded shadow hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="mt-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error message */}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Weather card */}
        {data && <WeatherCard data={data} />}

        {/* Refresh button */}
        {data && (
          <button
            onClick={() => fetchWeather(data.name)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            🔁 Refresh
          </button>
        )}

        {/* Theme toggle */}
        <ThemeToggle />
      </div>

      {/* Forecast */}
      {data && forecastData && (
        <div className="mt-8 w-full overflow-x-auto px-4">
          <div className="flex gap-4 justify-center">
            <ForecastCard forecast={forecastData} />
          </div>
        </div>
      )}
    </div>
  );
}
