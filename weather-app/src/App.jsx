import React from 'react';
import Weather from './components/Weather';

function App() {
  return (
    <div className="min-h-screen w-full py-12 px-4 flex items-center justify-center">
      <div className="w-full">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
            SKY<span className="text-blue-400">CAST</span>
          </h1>
          <p className="text-blue-200/60 font-medium uppercase tracking-[0.3em] text-xs">
            Premium Weather Experience
          </p>
        </header>
        
        <main>
          <Weather />
        </main>
        
        <footer className="mt-16 text-center text-blue-200/30 text-sm">
          <p>&copy; {new Date().getFullYear()} SkyCast Weather. Powered by OpenWeather API.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
