import { useSelector } from "react-redux";
import setWeatherIcon from "../functions/setWeatherIcon";

const DayCard = ({ index, dayFormatter }) => {
  const { daily } = useSelector((store) => store.forecast.forecast);
  return (
    <div className="day-card flex w-[109px] flex-col items-center rounded-lg border-2 border-solid border-black p-1 dark:border-gray-400 md:p-3">
      {setWeatherIcon(daily[index].iconCode, "md:text-7xl text-3xl")}
      <div className="day-card-day md:text-m text-m mt-2 uppercase ">
        {dayFormatter.format(daily[index].timestamp)}
      </div>
      <div className="day-card-temp text-2xl md:text-3xl">
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
