import React from 'react';
import { motion } from 'framer-motion';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm, 
  WiCloudyWindy 
} from 'react-icons/wi';

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear': return <WiDaySunny className="text-4xl text-yellow-400" />;
    case 'clouds': return <WiCloudy className="text-4xl text-gray-400" />;
    case 'rain': return <WiRain className="text-4xl text-blue-400" />;
    case 'snow': return <WiSnow className="text-4xl text-white" />;
    case 'thunderstorm': return <WiThunderstorm className="text-4xl text-purple-400" />;
    default: return <WiCloudyWindy className="text-4xl text-blue-200" />;
  }
};

const Forecast = ({ data }) => {
  if (!data) return null;

  // Filter for noon readings (or one per day)
  const dailyForecast = data.filter((item) => item.dt_txt.includes('12:00:00'));

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-white">5-Day Forecast</h3>
      <div className="flex flex-wrap gap-4 justify-between">
        {dailyForecast.map((day, index) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 flex flex-col items-center flex-1 min-w-[120px]"
          >
            <p className="text-sm text-blue-200 font-medium">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <div className="my-2">
              {getWeatherIcon(day.weather[0].main)}
            </div>
            <p className="text-lg font-bold text-white">{Math.round(day.main.temp)}°C</p>
            <p className="text-xs text-blue-100 capitalize">{day.weather[0].description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
