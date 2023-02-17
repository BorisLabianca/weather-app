import { useSelector } from "react-redux";
import setWeatherIcon from "../functions/setWeatherIcon";
import languages from "../assets/languages.json";

const MainCard = ({ hourFormatter }) => {
  const { language } = useSelector((store) => store.localization);
  const { current } = useSelector((store) => store.forecast.forecast);
  // console.log(current);
  return (
    <div className="mx-auto my-3 flex flex-col items-center justify-center md:flex-row xl:gap-8">
      <div className="header-left flex h-fit flex-col items-center gap-2 border-b-2 border-solid border-black pb-4 dark:border-gray-400 md:border-b-0 md:border-r-2 md:pb-0 md:pr-8">
        {new Intl.DateTimeFormat(`${language}`, { dateStyle: "full" })
          .format(new Date())
          .toUpperCase()}
        <div className="flex items-center gap-8 ">
          <div>
            {setWeatherIcon(
              current.iconCode,
              "md:text-[9rem] text-[6rem]",
              hourFormatter.format(current.time)
            )}
          </div>
          <div className="header-current-temp text-8xl">
            <span>{current.currentTemp}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div>{current.city}</div>
        <div>{current.principalSubdivision}</div>
      </div>
      <div className="header-right flex w-80 flex-wrap items-center justify-center divide-x-2 pt-4 md:pt-0 md:pl-8">
        <div className="info-group my-2 flex flex-col items-center px-3">
          <div className="label text-xl font-bold uppercase">
            {language === "fr"
              ? languages.fr.max
              : language === "en" && languages.eng.max}
          </div>
          <div className="text-xl">
            <span>{current.highTemp}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div className="info-group my-2 flex flex-col items-center px-3">
          <div className="label text-xl font-bold uppercase">
            {language === "fr"
              ? languages.fr.flHigh
              : language === "en" && languages.eng.flHigh}
          </div>
          <div className="text-xl">
            <span>{current.highFeelsLike}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div className="info-group my-2 flex flex-col items-center px-3">
          <div className="label text-xl font-bold uppercase">
            {language === "fr"
              ? languages.fr.wind
              : language === "en" && languages.eng.wind}
          </div>
          <div className="text-xl">
            <span>{current.windSpeed}</span>
            <span className="text-sm"> {current.dailyUnits.windspeed_10m}</span>
          </div>
        </div>
        <div className="info-group my-2 flex flex-col items-center px-3">
          <div className="label text-xl font-bold uppercase">
            {language === "fr"
              ? languages.fr.min
              : language === "en" && languages.eng.min}
          </div>
          <div className="text-xl">
            <span>{current.lowTemp}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div className="info-group my-2 flex flex-col items-center px-3">
          <div className="label text-xl font-bold uppercase">
            {language === "fr"
              ? languages.fr.flLow
              : language === "en" && languages.eng.flLow}
          </div>
          <div className="text-xl">
            <span>{current.lowFeelsLike}</span>
            {current.dailyUnits.temperature_2m}
          </div>
        </div>
        <div className="info-group my-2 flex flex-col items-center px-3">
          <div className="label text-xl font-bold uppercase">
            {language === "fr"
              ? languages.fr.precip
              : language === "en" && languages.eng.precip}
          </div>
          <div className="text-xl">
            <span>{current.precip}</span>
            <span className="text-sm"> {current.dailyUnits.precipitation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
