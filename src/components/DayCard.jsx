import { useSelector } from "react-redux";
import setWeatherIcon from "../functions/setWeatherIcon";
import switchDayLanguage from "../functions/switchDayLanguage";

const DayCard = ({ index, dayFormatter }) => {
  const { daily } = useSelector((store) => store.forecast.forecast);
  const { language } = useSelector((store) => store.localization);
  return (
    <div className="day-card flex flex-col items-center rounded-lg border-2 border-solid border-black p-3 dark:border-gray-400   ">
      {setWeatherIcon(daily[index].iconCode, "text-7xl")}
      <div className="day-card-day mt-2 text-sm uppercase ">
        {switchDayLanguage(
          dayFormatter.format(daily[index].timestamp),
          language
        )}
      </div>
      <div className="day-card-temp text-3xl">
        {daily[index].maxTemp}
        {daily[index].daily_units.apparent_temperature_max}
      </div>
      <div className="day-card-temp text-m">
        {daily[index].minTemp}
        {daily[index].daily_units.apparent_temperature_min}
      </div>
      <div className="day-card-temp text-m">
        {daily[index].precip} {daily[index].daily_units.precipitation_sum}
      </div>
    </div>
  );
};

export default DayCard;
