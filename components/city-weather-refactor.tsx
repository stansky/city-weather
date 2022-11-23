import { useState, useEffect } from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "340716fc77875b21cfa53705a99fae3f";

interface CityWeatherProps {
  city: string;
}

interface WeatherResult {
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

const CityWeatherRefactor = ({ city }: CityWeatherProps) => {
  const [weatherResult, setWeatherResult] = useState<WeatherResult | null>(
    null
  );
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      setError(false);
      setWeatherResult(null);

      const urlParams = new URLSearchParams({
        q: city,
        appid: API_KEY,
      });

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${urlParams}`
      );
      if (response.status !== 200) {
        setError(true);
      } else {
        const data: WeatherResult = await response.json();
        setWeatherResult(data);
      }
      setLoading(false);
    };
    getWeatherData().catch(console.error);
  }, [city]);

  return (
    <>
      {isLoading && <span className="sr-only">Loading Weather Data</span>}

      {weatherResult && !isError && (
        <div className="py-10 px-10 w-fit mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center content-center space-y-4">
          <h1
            data-testid="city-name"
            className="text-xl text-black uppercase font-bold"
          >
            {city}
          </h1>
          <div className="space-y-0.5">
            <img
              src={`http://openweathermap.org/img/wn/${weatherResult.weather[0]?.icon}@2x.png`}
              alt={weatherResult.weather[0]?.description}
            />
          </div>
          <div>
            <p className="text-lg text-slate-500 capitalize text-center">
              {weatherResult.weather[0]?.description}
            </p>
            <p className="text-lg text-slate-500">
              Temperature:
              <strong className="text-3xl font-medium text-black">
                &nbsp;{KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
              </strong>
            </p>
          </div>
        </div>
      )}
      {isError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">Error fetching weather data</span>
        </div>
      )}
    </>
  );
};

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export default CityWeatherRefactor;
