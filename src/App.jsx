import "./App.css";
import { RiSunFill } from "react-icons/ri";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addCoords,
  switchLocationLoading,
} from "./features/coords/coordsSlice";
import {
  switchIsloading,
  addForecastInfo,
} from "./features/forecast/forecastSlice";

// Import des composants
import DayCard from "./components/DayCard";
import HourlyWeatherLine from "./components/HourlyWeatherLine";

// https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true

function App() {
  const dispatch = useDispatch();
  const { coords, locationLoading } = useSelector((store) => store.coords);
  const { isLoading, forecast } = useSelector((store) => store.forecast);

  useEffect(() => {
    const getLocation = async () => {
      try {
        await navigator.geolocation.getCurrentPosition((position) => {
          dispatch(
            addCoords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
          localStorage.setItem("latitude", Number(position.coords.latitude));
          localStorage.setItem("longitude", Number(position.coords.longitude));
        });
        dispatch(switchLocationLoading(false));
      } catch (error) {
        console.log(error.data);
        alert(
          "There was an error getting your location. Please allow us to use your location and refresh the page."
        );
      }
    };
    getLocation();
  }, []);
  useEffect(() => {
    const getWeather = async (lat, lng, timezone) => {
      try {
        const { data } = await axios.get(
          "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime",
          {
            params: { latitude: lat, longitude: lng, timezone: timezone },
          }
        );
        // console.log("1st log : ", data);
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
        // console.log("2nd log : ", parseCurrentWeather(data));
        dispatch(
          addForecastInfo({
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data),
          })
        );
        dispatch(switchIsloading(false));
        dispatch(switchLocationLoading(true));
        // setCurrent(parseCurrentWeather(data));
        // setDaily(parseDailyWeather(data));
        // console.log("3rd log : ", parseDailyWeather(data));
        // setHourly(parseHourlyWeather(data));
        // console.log("4th log : ", parseHourlyWeather(data));
      } catch (error) {
        console.log(error.data);
      }
    };
    if (!locationLoading && coords.latitude && coords.longitude) {
      getWeather(
        localStorage.getItem("latitude")
          ? localStorage.getItem("latitude")
          : coords.latitude,
        localStorage.getItem("longitude")
          ? localStorage.getItem("longitude")
          : coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
    }
  }, [coords, locationLoading]);
  const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });
  const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
  });

  return isLoading || !forecast ? (
    <div className="flex h-screen items-center justify-center">
      <RiSunFill className="weather-icon animate-loader text-8xl text-amber-300" />
    </div>
  ) : (
    <div className="App ">
      <header className="header mx-auto mt-8 flex w-[1220px] justify-center gap-8">
        <div className="header-left flex h-48 items-center gap-4 border-r-2 border-solid border-black pr-8">
          <RiSunFill
            className="weather-icon animate-wiggle text-8xl text-amber-300"
            data-current-icon
          />
          <div className="header-current-temp text-4xl ">
            <span data-current-temp>{forecast.current.currentTemp}</span>
            {forecast.current.dailyUnits.temperature_2m_max}
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
        {forecast.daily &&
          forecast.daily.map((day, index) => {
            return (
              <DayCard key={index} index={index} dayFormatter={DAY_FORMATTER} />
            );
          })}
      </section>
      <section className="hourly-weather justify-center">
        {forecast.hourly &&
          forecast.hourly.map((_, index) => {
            return (
              index < 24 && (
                <HourlyWeatherLine
                  key={index}
                  index={index}
                  hourFormatter={HOUR_FORMATTER}
                  dayFormatter={DAY_FORMATTER}
                />
              )
            );
          })}
        {/* {console.log(
          "after isLoading passed to false : ",
          forecast.hourly.length
        )} */}
      </section>
    </div>
  );
}

export default App;
