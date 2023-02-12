import { FaCloud } from "react-icons/fa";

const HourlyWeatherLine = () => {
  return (
    <div className="hour-row flex justify-center gap-10 p-2 odd:bg-gray-300 even:bg-gray-100">
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">Thursday</div>
        <div className="hour">3 PM</div>
      </div>
      <FaCloud className="weather-icon animate-wiggle text-5xl" />
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">temp </div>
        <div className="hour">31&deg;</div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">Fl temp</div>
        <div className="hour">25&deg;</div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">wind</div>
        <div className="hour">
          6<span className="text-xs">mph</span>
        </div>
      </div>
      <div className="info-group flex flex-col items-center">
        <div className="label text-xs font-bold uppercase">precip</div>
        <div className="hour">
          0<span className="text-xs">in</span>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeatherLine;
