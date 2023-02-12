import "./App.css";
import { FaSun } from "react-icons/fa";
import { RiSnowyFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";

// Import des composants
import DayCard from "./components/DayCard";
import HourlyWeatherLine from "./components/HourlyWeatherLine";

// https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true

function App() {
  const [current, setCurrent] = useState("");
  const [daily, setDaily] = useState("");
  const [hourly, setHourly] = useState("");

  useEffect(() => {
    const getWeather = async (lat, lng, timezone) => {
      try {
        const { data } = await axios.get(
          "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime",
          {
            params: { latitude: lat, longitude: lng, timezone: timezone },
          }
        );
        console.log("1st log : ", data);
        const parseCurrentWeather = ({
          current_weather,
          daily,
          daily_units,
        }) => {
          const {
            temperature: currentTemp,
            windspeed: windSpeed,
            weathercode: iconCode,
          } = current_weather;
          const {
            temperature_2m_max: [maxTemp],
            temperature_2m_min: [minTemp],
            apparent_temperature_max: [maxFeelsLike],
            apparent_temperature_min: [minFeelsLike],
            precipitation_sum: [precip],
          } = daily;
          return {
            currentTemp: Math.round(currentTemp),
            highTemp: Math.round(maxTemp),
            lowTemp: Math.round(minTemp),
            highFeelsLike: Math.round(maxFeelsLike),
            lowFeelsLike: Math.round(minFeelsLike),
            windSpeed: Math.round(windSpeed),
            precip,
            iconCode,
            dailyUnits: daily_units,
          };
        };
        const parseDailyWeather = ({ daily, daily_units }) => {
          return daily.time.map((time, index) => {
            return {
              timestamp: time * 1000,
              iconCode: daily.weathercode[index],
              maxTemp: Math.round(daily.temperature_2m_max[index]),
              minTemp: Math.round(daily.temperature_2m_min[index]),
              precip: daily.precipitation_sum[index],
              daily_units,
            };
          });
        };
        const parseHourlyWeather = ({
          hourly,
          hourly_units,
          current_weather,
        }) => {
          return hourly.time
            .map((time, index) => {
              return {
                timestamp: time * 1000,
                iconCode: hourly.weathercode[index],
                temp: Math.round(hourly.temperature_2m[index]),
                feelsLike: Math.round(hourly.apparent_temperature[index]),
                windSpeed: Math.round(hourly.windspeed_10m[index]),
                precip: hourly.precipitation[index],
                hourly_units,
              };
            })
            .filter(
              ({ timestamp }) => timestamp >= current_weather.time * 1000
            );
        };
        console.log("2nd log : ", parseCurrentWeather(data));
        setCurrent(parseCurrentWeather(data));
        setDaily(parseDailyWeather(data));
        console.log("3rd log : ", parseDailyWeather(data));
        setHourly(parseHourlyWeather(data));
        console.log("4th log : ", parseHourlyWeather(data));
      } catch (error) {
        console.log(error);
      }
    };
    getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <div className="App ">
      <header className="header mx-auto mt-8 flex w-[1220px] justify-center gap-8">
        <div className="header-left flex h-48 items-center gap-4 border-r-2 border-solid border-black pr-8">
          <FaSun
            className="weather-icon animate-wiggle text-8xl"
            data-current-icon
          />
          <RiSnowyFill className="weather-icon ani animate-wiggle text-8xl" />
          <div className="header-current-temp text-4xl ">
            <span data-current-temp>31</span>&deg;
          </div>
        </div>
        <div className="header-right flex w-52 flex-wrap items-center gap-2">
          <div className="info-group flex flex-col items-center">
            <div className="label text-xs font-bold uppercase">High</div>
            <div>
              <span data-current-high>32</span>&deg;
            </div>
          </div>
          <div className="info-group flex flex-col items-center">
            <div className="label text-xs font-bold uppercase">FL High</div>
            <div>
              <span data-current-fl-high>27</span>&deg;
            </div>
          </div>
          <div className="info-group flex flex-col items-center">
            <div className="label text-xs font-bold uppercase">Wind</div>
            <div>
              <span data-current-wind>9</span>
              <span className="text-xs">mph</span>
            </div>
          </div>
          <div className="info-group flex flex-col items-center">
            <div className="label text-xs font-bold uppercase">Low</div>
            <div>
              <span data-current-low>19</span>&deg;
            </div>
          </div>
          <div className="info-group flex flex-col items-center">
            <div className="label text-xs font-bold uppercase">FL Low</div>
            <div>
              <span data-current-fl-low>12</span>&deg;
            </div>
          </div>
          <div className="info-group flex flex-col items-center">
            <div className="label text-xs font-bold uppercase">Precip</div>
            <div>
              <span data-current-precip>0.1</span>
              <span className="text-xs">in</span>
            </div>
          </div>
        </div>
      </header>
      <section
        className="day-section flex flex-wrap  items-center justify-center gap-2 p-4  "
        data-day-section
      >
        <DayCard />
        <DayCard />
        <DayCard />
        <DayCard />
        <DayCard />
        <DayCard />
        <DayCard />
      </section>
      <section className="hourly-weather justify-center">
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
        <HourlyWeatherLine />
      </section>
    </div>
  );
}

export default App;
