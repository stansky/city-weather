// eslint-disable @typescript-eslint/no-use-before-define
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
  weather: any[];
}

const CityWeatherRefactor = ({ city }: CityWeatherProps) => {
  const [weatherResult, setWeatherResult] = useState<WeatherResult | null>(
    null
  );
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherResult(data);
        setLoading(false);
      });
  }, [city]);

  return (
    <>
      {weatherResult && (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center content-center space-y-4">
          <div className="text-xl text-black uppercase font-bold">{city}</div>
          <div className="space-y-0.5">
            <img
              className="h-12 w-12"
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
              <span className="text-2xl font-medium text-black">
                 &nbsp;{KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export default CityWeatherRefactor;
