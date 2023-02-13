import { useSelector } from "react-redux";
import setWeatherIcon from "../functions/setWeatherIcon";

const DayCard = ({ index, dayFormatter }) => {
  const { daily } = useSelector((store) => store.forecast.forecast);
  console.log(daily);
  return (
    <div className="day-card flex flex-col items-center rounded-lg border-2 border-solid border-black p-3 ">
      {setWeatherIcon(daily[index].iconCode)}
      <div className="day-card-day mt-2 text-sm uppercase ">
        {dayFormatter.format(daily[index].timestamp)}
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
