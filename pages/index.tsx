import { useState } from "react";
import { CityWeather } from "../components/city-weather";
import CityWeatherRefactor from "../components/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string>();
  return (
    <div className="container mx-auto max-w-lg flex flex-col justify-center h-screen">
      <form
        className="justify-center mb-10 flex"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          const cityName = formdata.get("weather-input");
          if (cityName) {
            setCity(cityName.toString());
          }
        }}
      >
        <label
          className="flex items-center mr-0.5 min-w-fit px-2.5 text-black font-medium"
          htmlFor="weather-input"
        >
          Weather Search:
        </label>
        <input
          data-testid="weather-input"
          name="weather-input"
          id="weather-input"
          className="rounded-md rounded-r-none block w-full focus:shadow-md py-2 px-3 text-gray-700"
          type="text"
        />
        <button
          className="uppercase rounded-md rounded-l-none py-2 px-6 cursor-pointer tracking-wider text-md text-center bg-blue-500 text-white font-bold hover:bg-blue-600 hover:shadow-blue"
          data-testid="weather-submit"
          type="submit"
        >
          Submit
        </button>
      </form>

      {city && (
        <div className="mt-4">
          <CityWeatherRefactor city={city} />
        </div>
      )}
    </div>
  );
}
