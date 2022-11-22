// eslint-disable @typescript-eslint/no-use-before-define
import { Component } from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "340716fc77875b21cfa53705a99fae3f";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
}

export class CityWeather extends Component<CityWeatherProps, CityWeatherState> {
  public constructor(props: CityWeatherProps) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  public componentDidMount() {
    this.updateWeather(this.props);
  
  }
  public componentDidUpdate(prevProps: CityWeatherProps) {
    if (this.props.city !== prevProps.city)
    this.updateWeather(this.props);
  }

  public updateWeather(props: CityWeatherProps) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => this.setState({ weatherResult: result }));
      console.log(this.state)
    }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;

    return (
      <div>
        <h1>{city}</h1>
        {weatherResult && (
          <>
            <div>
              Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
            </div>
            <div>Descripiton: {weatherResult.weather[0].description}</div>
          </>
        )}
      </div>
    );
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}
