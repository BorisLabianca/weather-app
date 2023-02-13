import { useSelector } from "react-redux";
import setWeatherIcon from "../functions/setWeatherIcon";

const HourlyWeatherLine = ({ index, dayFormatter, hourFormatter }) => {
  const { hourly } = useSelector((store) => store.forecast.forecast);
  return (
    <div className="hour-row flex justify-center gap-10 p-2 odd:bg-gray-300 even:bg-gray-100">
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">
          {dayFormatter.format(hourly[index].timestamp)}
        </div>
        <div className="hour">
          {hourFormatter.format(hourly[index].timestamp)}
        </div>
      </div>
      {setWeatherIcon(hourly[index].iconCode)}{" "}
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">temp </div>
        <div className="hour">
          {hourly[index].temp}
          {hourly[index].hourly_units.apparent_temperature}
        </div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">Ress.</div>
        <div className="hour">
          {hourly[index].feelsLike}
          {hourly[index].hourly_units.temperature_2m}
        </div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">vent</div>
        <div className="hour">
          {hourly[index].windSpeed}{" "}
          <span className="text-xs">
            {hourly[index].hourly_units.windspeed_10m}
          </span>
        </div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">précip</div>
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
