import { FaCloud } from "react-icons/fa";
const DayCard = () => {
  return (
    <div className="day-card flex flex-col items-center rounded-lg border-2 border-solid border-black p-3 ">
      <FaCloud className="weather-icon animate-wiggle text-7xl" />
      <div className="day-card-day mt-2 text-sm ">Monday</div>
      <div className="day-card-temp text-3xl">32&deg;</div>
    </div>
  );
};

export default DayCard;
