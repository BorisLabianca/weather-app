import { useSelector } from "react-redux";
import setWeatherIcon from "../functions/setWeatherIcon";
import switchDayLanguage from "../functions/switchDayLanguage";
import languages from "../assets/languages.json";

const HourlyWeatherLine = ({ index, dayFormatter, hourFormatter }) => {
  const { hourly } = useSelector((store) => store.forecast.forecast);
  const { language } = useSelector((store) => store.localization);
  return (
    <div className="hour-row flex items-center justify-center gap-10 p-2 odd:bg-gray-300 even:bg-gray-100">
      <div className="info-group flex flex-col items-center">
        <div className="label flex w-16 justify-center text-xs font-bold uppercase">
          {switchDayLanguage(
            dayFormatter.format(hourly[index].timestamp),
            language
          )}
        </div>
        <div className="hour">
          {hourFormatter.format(hourly[index].timestamp)}
        </div>
      </div>
      {setWeatherIcon(hourly[index].iconCode, "text-5xl")}
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
