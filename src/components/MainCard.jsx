import { useSelector } from "react-redux";
import setWeatherIcon from "../functions/setWeatherIcon";
import languages from "../assets/languages.json";

const MainCard = ({ hourFormatter }) => {
  const { language } = useSelector((store) => store.localization);
  const { current } = useSelector((store) => store.forecast.forecast);
  // console.log(current);
  return (
    <div className="header mx-auto flex w-[1220px] justify-center gap-8">
      <div className="header-left flex h-60 flex-col items-center gap-4 border-r-2 border-solid border-black pr-8 dark:border-gray-400">
        {new Intl.DateTimeFormat(`${language}`, { dateStyle: "full" })
          .format(new Date())
          .toUpperCase()}
        <div className="flex items-center gap-8 ">
          {setWeatherIcon(
            current.iconCode,
            "text-[9rem]",
            hourFormatter.format(current.time)
          )}
          <div className="header-current-temp text-8xl">
            <span data-current-temp>{current.currentTemp}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div>{current.city}</div>
        <div>{current.principalSubdivision}</div>
      </div>
      <div className="header-right flex w-52 flex-wrap items-center gap-2">
        <div className="info-group flex flex-col items-center">
          <div className="label text-xs font-bold uppercase">
            {language === "fr"
              ? languages.fr.max
              : language === "en" && languages.eng.max}
          </div>
          <div>
            <span data-current-high>{current.highTemp}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div className="info-group flex flex-col items-center">
          <div className="label text-xs font-bold uppercase">
            {language === "fr"
              ? languages.fr.flHigh
              : language === "en" && languages.eng.flHigh}
          </div>
          <div>
            <span data-current-fl-high>{current.highFeelsLike}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div className="info-group flex flex-col items-center">
          <div className="label text-xs font-bold uppercase">
            {language === "fr"
              ? languages.fr.wind
              : language === "en" && languages.eng.wind}
          </div>
          <div>
            <span data-current-wind>{current.windSpeed}</span>
            <span className="text-xs"> {current.dailyUnits.windspeed_10m}</span>
          </div>
        </div>
        <div className="info-group flex flex-col items-center">
          <div className="label text-xs font-bold uppercase">
            {language === "fr"
              ? languages.fr.min
              : language === "en" && languages.eng.min}
          </div>
          <div>
            <span data-current-low>{current.lowTemp}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div className="info-group flex flex-col items-center">
          <div className="label text-xs font-bold uppercase">
            {language === "fr"
              ? languages.fr.flLow
              : language === "en" && languages.eng.flLow}
          </div>
          <div>
            <span data-current-fl-low>{current.lowFeelsLike}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div className="info-group flex flex-col items-center">
          <div className="label text-xs font-bold uppercase">
            {language === "fr"
              ? languages.fr.precip
              : language === "en" && languages.eng.precip}
          </div>
          <div>
            <span data-current-precip>{current.precip}</span>
            <span className="text-xs"> {current.dailyUnits.precipitation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
