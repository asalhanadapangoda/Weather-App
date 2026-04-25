import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCurrentWeather, fetchForecast } from '../services/api';
import { IoSearch } from 'react-icons/io5';
import { 
  WiHumidity, 
  WiStrongWind, 
  WiThermometer, 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm, 
  WiCloudyWindy 
} from 'react-icons/wi';
import Forecast from './Forecast';
import WeatherChart from './WeatherChart';

const getWeatherIcon = (condition) => {
  const style = "text-8xl mb-4 drop-shadow-lg";
  switch (condition.toLowerCase()) {
    case 'clear': return <WiDaySunny className={`${style} text-yellow-400`} />;
    case 'clouds': return <WiCloudy className={`${style} text-gray-300`} />;
    case 'rain': return <WiRain className={`${style} text-blue-400`} />;
    case 'snow': return <WiSnow className={`${style} text-white`} />;
    case 'thunderstorm': return <WiThunderstorm className={`${style} text-purple-400`} />;
    default: return <WiCloudyWindy className={`${style} text-blue-200`} />;
  }
};

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const current = await fetchCurrentWeather(city);
      const forecast = await fetchForecast(city);
      setWeatherData(current);
      setForecastData(forecast.list);
      setCity('');
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Default city on load
  useEffect(() => {
    const fetchDefault = async () => {
      setLoading(true);
      try {
        const current = await fetchCurrentWeather('London');
        const forecast = await fetchForecast('London');
        setWeatherData(current);
        setForecastData(forecast.list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDefault();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSearch} className="relative mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 px-6 pr-12 text-white outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-lg"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        >
          <IoSearch size={24} />
        </button>
      </form>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-200 font-medium">Fetching weather data...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl p-6 text-center text-red-200"
          >
            {error}
          </motion.div>
        ) : weatherData ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Weather Card */}
            <div className="glass p-8 rounded-[2.5rem] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              
              <div className="flex flex-col items-center">
                <h2 className="text-4xl font-bold text-white mb-2">{weatherData.name}</h2>
                <p className="text-blue-200 uppercase tracking-widest text-sm mb-6">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                
                {getWeatherIcon(weatherData.weather[0].main)}
                
                <div className="text-7xl font-bold text-white mb-2">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <p className="text-2xl text-blue-100 capitalize mb-8">{weatherData.weather[0].description}</p>
                
                <div className="grid grid-cols-3 gap-8 w-full border-t border-white/10 pt-8 mt-4">
                  <div className="flex flex-col items-center">
                    <WiThermometer className="text-3xl text-blue-300 mb-1" />
                    <span className="text-xs text-blue-200 uppercase">Feels Like</span>
                    <span className="text-xl font-semibold text-white">{Math.round(weatherData.main.feels_like)}°C</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-white/10">
                    <WiHumidity className="text-3xl text-blue-300 mb-1" />
                    <span className="text-xs text-blue-200 uppercase">Humidity</span>
                    <span className="text-xl font-semibold text-white">{weatherData.main.humidity}%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <WiStrongWind className="text-3xl text-blue-300 mb-1" />
                    <span className="text-xs text-blue-200 uppercase">Wind Speed</span>
                    <span className="text-xl font-semibold text-white">{weatherData.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast and Chart */}
            <Forecast data={forecastData} />
            <WeatherChart data={forecastData} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Weather;
