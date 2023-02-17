import { useSelector } from "react-redux";
import setWeatherIcon from "../functions/setWeatherIcon";
import switchDayLanguage from "../functions/switchDayLanguage";
import languages from "../assets/languages.json";

const HourlyWeatherLine = ({ index, dayFormatter, hourFormatter }) => {
  const { hourly } = useSelector((store) => store.forecast.forecast);
  const { language } = useSelector((store) => store.localization);
  return (
    <div className="hour-row flex items-center justify-center odd:bg-blue-300 even:bg-blue-200 dark:odd:bg-slate-700 dark:even:bg-slate-500 lg:gap-10 lg:p-2 ">
      <div className="info-group flex flex-col items-center">
        <div className="label flex w-16 justify-center text-xs font-bold uppercase">
          {dayFormatter.format(hourly[index].timestamp)}
        </div>
        <div className="hour">
          {hourFormatter.format(hourly[index].timestamp)}
        </div>
      </div>
      <div>
        {setWeatherIcon(
          hourly[index].iconCode,
          "xl:text-5xl text-2xl",
          hourFormatter.format(hourly[index].timestamp)
        )}
      </div>

      <div className="info-group flex flex-col items-center">
        <div className="label flex w-16 justify-center text-xs font-bold uppercase">
          temp.
        </div>
        <div className="hour">
          {hourly[index].temp}
          {hourly[index].hourly_units.apparent_temperature}
        </div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label flex w-16 justify-center text-xs font-bold uppercase">
          {language === "fr"
            ? languages.fr.fl
            : language === "en" && languages.eng.fl}
        </div>
        <div className="hour">
          {hourly[index].feelsLike}
          {hourly[index].hourly_units.temperature_2m}
        </div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label flex w-16 justify-center text-xs font-bold uppercase">
          {language === "fr"
            ? languages.fr.wind
            : language === "en" && languages.eng.wind}
        </div>
        <div className="hour">
          {hourly[index].windSpeed}{" "}
          <span className="text-xs">
            {hourly[index].hourly_units.windspeed_10m}
          </span>
        </div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label flex w-16 justify-center text-xs font-bold uppercase">
          {language === "fr"
            ? languages.fr.precip
            : language === "en" && languages.eng.precip}
        </div>
        <div className="hour">
          {hourly[index].precip}{" "}
          <span className="text-xs">
            {hourly[index].hourly_units.precipitation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeatherLine;
