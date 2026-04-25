import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const WeatherChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Process data to get daily average or just take points
  // OpenWeather forecast gives data every 3 hours. 
  // Let's take one point per day or all points if preferred.
  // For a 5-day chart, taking noon readings is a common practice.
  const chartData = data
    .filter((item) => item.dt_txt.includes('12:00:00'))
    .map((item) => ({
      name: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(item.main.temp),
    }));

  return (
    <div className="w-full h-64 mt-8 glass-card p-4">
      <h3 className="text-xl font-semibold mb-4 text-white">Temperature Trend (°C)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.6)" 
            tick={{ fill: 'rgba(255,255,255,0.6)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.6)" 
            tick={{ fill: 'rgba(255,255,255,0.6)' }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            itemStyle={{ color: '#fff' }}
          />
          <Line 
            type="monotone" 
            dataKey="temp" 
            stroke="#60a5fa" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#60a5fa' }}
            activeDot={{ r: 6, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
