import { Mountain, Compass, Snowflake, CloudRain } from 'lucide-react';

const Weather = ({ weather, currentLang, getWeatherIcon }) => {
  const renderForecast = (data, location = 'inconnu') => {
    if (!data || data.error || !data.daily) {
      return (
        <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">
          {data?.error || 'Chargement des données météo…'}
        </div>
      );
    }
    
    const days = Array.isArray(data.daily?.time) ? data.daily.time : [];
    if (days.length === 0) {
      return (
        <div className="text-gray-500 p-4 bg-yellow-50 rounded-lg">
          Aucune donnée météo disponible pour le moment
        </div>
      );
    }
    
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          {location === 'tignes' ? (
            <Mountain className="h-5 w-5 mr-2 text-blue-600" />
          ) : (
            <Compass className="h-5 w-5 mr-2 text-blue-600" />
          )}
          {location === 'tignes' ? 'Tignes' : "Val d'Isère"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {days.map((d, i) => (
            <div key={d} className="bg-white/90 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-medium text-gray-700 mb-1">
                {new Date(d).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short' })}
              </div>
              <div className="flex justify-center my-2">
                {getWeatherIcon(data.daily.weather_code?.[i] || 0)}
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-bold text-blue-600">
                  {Math.round(data.daily.temperature_2m_max?.[i] || 0)}°
                </span>
                <span className="text-gray-500 text-sm">
                  {Math.round(data.daily.temperature_2m_min?.[i] || 0)}°
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <Snowflake className="h-3 w-3 mr-1 text-blue-400" />
                  {Math.round(data.daily.snowfall_sum?.[i] || 0)}cm
                </span>
                <span className="flex items-center">
                  <CloudRain className="h-3 w-3 mr-1 text-blue-400" />
                  {Math.round(data.daily.precipitation_sum?.[i] || 0)}mm
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="weather" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Météo des Stations
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Consultez les prévisions météorologiques pour planifier au mieux vos sorties ski.
          </p>
        </div>
        
        <div className="space-y-8">
          {weather.tignes && renderForecast(weather.tignes, 'tignes')}
          {weather.val && renderForecast(weather.val, 'val')}
          
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>Les prévisions sont mises à jour toutes les heures. Dernière mise à jour : {new Date().toLocaleTimeString()}</p>
            <p className="mt-2">Source: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open-Meteo.com</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weather;
