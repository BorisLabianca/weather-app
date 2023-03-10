import "./App.css";
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { FaThermometerHalf } from "react-icons/fa";
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
import {
  switchLanguage,
  switchUnits,
} from "./features/localization/localizationSlice";
import { switchTheme } from "./features/theme/themeSlice";

// Import des composants
import MainCard from "./components/MainCard";
import DayCard from "./components/DayCard";
import HourlyWeatherLine from "./components/HourlyWeatherLine";

// https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=51.5072&longitude=0.1276&localityLanguage=fr

function App() {
  const dispatch = useDispatch();
  const { coords, locationLoading } = useSelector((store) => store.coords);
  const { isLoading, forecast } = useSelector((store) => store.forecast);
  const { language, fahrenheit } = useSelector((store) => store.localization);
  const { theme } = useSelector((store) => store.theme);
  // const temperatureUnit = "celsius";
  // const precipitationUnit = "mm";
  // const windspeedUnit = "kmh";
  // const language = "fr";
  useEffect(() => {
    const getLocation = async () => {
      try {
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch(
              addCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              })
            );
            localStorage.setItem("latitude", Number(position.coords.latitude));
            localStorage.setItem(
              "longitude",
              Number(position.coords.longitude)
            );
          },
          () => {
            alert(
              "There was an error getting your location. Please allow us to use your location and refresh the page."
            );
          }
        );
        dispatch(switchLocationLoading(false));
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, []);
  useEffect(() => {
    const getWeather = async (lat, lng, timezone, fahrenheit) => {
      try {
        const { data } = await axios.get(
          `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&${
            fahrenheit &&
            "temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch"
          }`,
          {
            params: {
              latitude: lat,
              longitude: lng,
              timezone: timezone,
            },
          }
        );
        const city = await axios.get(
          "https://api.bigdatacloud.net/data/reverse-geocode-client",
          {
            params: {
              latitude: lat,
              longitude: lng,
              localityLanguage: language,
            },
          }
        );
        // console.log("city : ", city.data);
        // console.log("1st log : ", data);
        const parseCurrentWeather = (
          { current_weather, daily, hourly_units },
          { city, principalSubdivision }
        ) => {
          const {
            temperature: currentTemp,
            windspeed: windSpeed,
            weathercode: iconCode,
            time,
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
            precip: Math.round(precip * 100) / 100,
            iconCode,
            time,
            dailyUnits: hourly_units,
            city,
            principalSubdivision,
          };
        };
        const parseDailyWeather = ({ daily, daily_units }) => {
          return daily.time.map((time, index) => {
            return {
              timestamp: time * 1000,
              iconCode: daily.weathercode[index],
              maxTemp: Math.round(daily.temperature_2m_max[index]),
              minTemp: Math.round(daily.temperature_2m_min[index]),
              precip: Math.round(daily.precipitation_sum[index] * 100) / 100,
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
                precip: Math.round(hourly.precipitation[index] * 100) / 100,
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
            current: parseCurrentWeather(data, city.data),
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
        console.log(error);
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
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        fahrenheit
      );
    }
  }, [coords, locationLoading, fahrenheit, language]);
  const DAY_FORMATTER = new Intl.DateTimeFormat(
    language === "fr" ? "fr" : language === "en" && "en-US",
    { weekday: "long" }
  );
  const HOUR_FORMATTER = new Intl.DateTimeFormat(
    language === "fr" ? "fr" : language === "en" && "en-US",
    {
      hour: "numeric",
    }
  );

  return isLoading || !forecast ? (
    <div className="flex h-screen items-center justify-center">
      <RiSunFill className="weather-icon animate-loader text-8xl text-amber-300" />
    </div>
  ) : (
    <div className={`App ${theme === "dark" && "dark"} h-full`}>
      <div className="h-auto dark:bg-slate-800 dark:text-white">
        <header className="fixed z-10 flex h-fit w-screen items-center justify-center gap-6 bg-white p-2 dark:bg-slate-800">
          <label className="flex">
            <input
              type={"checkbox"}
              className="peer appearance-none"
              onClick={() => {
                dispatch(switchLanguage());
                dispatch(switchLocationLoading(false));
              }}
            />
            <span className="relative flex h-7 w-14 flex-shrink-0 items-center rounded-full bg-blue-500 p-1 duration-300 ease-in-out after:z-[1] after:h-5 after:w-5 after:rounded-full after:bg-[url('./assets/Flag_of_France.svg')] after:bg-cover after:bg-center after:duration-300 peer-checked:bg-blue-500 peer-checked:after:translate-x-7 peer-checked:after:bg-[url('./assets/Flag_of_the_United_Kingdom_(3-5).svg')] peer-checked:after:bg-cover peer-checked:after:bg-center">
              <span className="absolute left-[5px] z-[0] justify-end text-sm text-white">
                EN
              </span>
              <span className="absolute right-[5px] z-[0] justify-end text-sm text-white">
                FR
              </span>
            </span>
          </label>
          <label className="flex">
            <input
              type={"checkbox"}
              className="peer appearance-none"
              onClick={() => {
                dispatch(switchUnits());
                dispatch(switchLocationLoading(false));
              }}
            />
            <span className="relative flex h-7 w-14 flex-shrink-0 items-center rounded-full bg-blue-500 p-1 duration-300 ease-in-out after:z-[1] after:h-5 after:w-5 after:rounded-full after:bg-white after:bg-[url('./assets/thermometer.svg')] after:bg-[length:8px] after:bg-center after:bg-no-repeat after:duration-300 after:ease-in-out peer-checked:after:translate-x-7">
              <span className="text-md absolute left-[5px] z-[0] justify-end text-white">
                ??F
              </span>
              <span className="text-md absolute right-[5px] z-[0] justify-end text-white">
                ??C
              </span>
            </span>
          </label>
          <label className="flex">
            <input
              type={"checkbox"}
              className="peer appearance-none"
              onClick={() => {
                dispatch(switchTheme());
              }}
            />
            <span className="relative flex h-7 w-14 flex-shrink-0 items-center rounded-full bg-blue-500 p-1 duration-300 ease-in-out after:z-[1] after:h-5 after:w-5 after:rounded-full after:bg-white after:duration-300 after:ease-in-out peer-checked:bg-slate-600 peer-checked:after:translate-x-7 peer-checked:after:bg-black peer-checked:after:duration-300 peer-checked:after:ease-in-out">
              <RiSunFill className="absolute right-1 z-[0] text-xl text-yellow-200" />
              <RiMoonFill className="fixed z-[0] justify-end text-xl text-yellow-200" />
            </span>
          </label>
        </header>
        <div className="app-container my-0 mx-auto pb-8 pt-14 lg:w-3/4">
          <MainCard hourFormatter={HOUR_FORMATTER} />
          {/* <div className="fixed top-2 left-4 flex w-20 rounded-3xl">
        <div
          onClick={() => {
            dispatch(switchLanguage());
            dispatch(switchLocationLoading(false));
          }}
          className={`w-8 cursor-pointer rounded-l-3xl font-bold ${
            language === "en"
              ? "bg-blue-500 shadow-switchinl"
              : "bg-slate-400 shadow-switchl"
          }`}
        >
          en
        </div>
        <div
          onClick={() => {
            dispatch(switchLanguage());
            dispatch(switchLocationLoading(false));
          }}
          className={`w-8 cursor-pointer rounded-r-3xl font-bold ${
            language === "fr"
              ? "bg-blue-500 shadow-switchinr"
              : "bg-slate-400 shadow-switchr"
          }`}
        >
          fr
        </div>
      </div>
      <div className="fixed top-9 left-4 flex">
        <div
          onClick={() => {
            dispatch(switchUnits());
            dispatch(switchLocationLoading(false));
          }}
          className={`w-8 cursor-pointer rounded-l-3xl font-bold ${
            !fahrenheit
              ? "bg-blue-500 shadow-switchinl"
              : "bg-slate-400 shadow-switchl"
          }`}
        >
          &deg;C
        </div>
        <div
          onClick={() => {
            dispatch(switchUnits());
            dispatch(switchLocationLoading(false));
          }}
          className={`w-8 cursor-pointer rounded-r-3xl font-bold ${
            fahrenheit
              ? "bg-blue-500 shadow-switchinr"
              : "bg-slate-400 shadow-switchr"
          }`}
        >
          &deg;F
        </div>
      </div> */}
          <section className="day-section flex flex-wrap items-center justify-center gap-2 p-4">
            {forecast.daily &&
              forecast.daily.map((day, index) => {
                return (
                  <DayCard
                    key={index}
                    index={index}
                    dayFormatter={DAY_FORMATTER}
                  />
                );
              })}
          </section>
          <section className="hourly-weather justify-center overflow-hidden rounded-xl">
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
      </div>
    </div>
  );
}

export default App;
