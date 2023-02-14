import {
  RiSnowyFill,
  RiSunFill,
  RiCloudyFill,
  RiFoggyFill,
  RiRainyFill,
  RiDrizzleFill,
  RiShowersFill,
  RiHeavyShowersFill,
  RiThunderstormsFill,
  RiHailFill,
  RiSunCloudyFill,
} from "react-icons/ri";

const setWeatherIcon = (iconCode, size) => {
  if (iconCode === 0) {
    return (
      <RiSunFill
        className={`weather-icon animate-wiggle ${size} text-amber-300`}
      />
    );
  } else if (iconCode === 1 || iconCode === 2) {
    return (
      <RiSunCloudyFill
        className={`weather-icon animate-wiggle ${size} text-yellow-100`}
      />
    );
  } else if (iconCode === 3) {
    return (
      <RiCloudyFill
        className={`weather-icon animate-wiggle ${size} text-neutral-300`}
      />
    );
  } else if (iconCode === 45 || iconCode === 48) {
    return (
      <RiFoggyFill
        className={`weather-icon animate-wiggle ${size} text-stone-200`}
      />
    );
  } else if (
    iconCode === 51 ||
    iconCode === 53 ||
    iconCode === 55 ||
    iconCode === 56 ||
    iconCode === 57
  ) {
    return (
      <RiDrizzleFill
        className={`weather-icon animate-wiggle ${size} text-slate-400`}
      />
    );
  } else if (iconCode === 61 || iconCode === 66 || iconCode === 80) {
    return (
      <RiRainyFill
        className={`weather-icon animate-wiggle ${size} text-gray-400`}
      />
    );
  } else if (iconCode === 63 || iconCode === 81) {
    return (
      <RiShowersFill
        className={`weather-icon animate-wiggle ${size} text-gray-500`}
      />
    );
  } else if (iconCode === 65 || iconCode === 67 || iconCode === 82) {
    return (
      <RiHeavyShowersFill
        className={`weather-icon animate-wiggle ${size} text-gray-600`}
      />
    );
  } else if (
    iconCode === 71 ||
    iconCode === 73 ||
    iconCode === 75 ||
    iconCode === 77 ||
    iconCode === 85 ||
    iconCode === 86
  ) {
    return (
      <RiSnowyFill
        className={`weather-icon animate-wiggle ${size} text-slate-300`}
      />
    );
  } else if (iconCode === 95) {
    return (
      <RiThunderstormsFill
        className={`weather-icon animate-wiggle ${size} text-stone-600`}
      />
    );
  } else if (iconCode === 96 || iconCode === 99) {
    return (
      <RiHailFill
        className={`weather-icon animate-wiggle ${size} text-zinc-600`}
      />
    );
  }
};

export default setWeatherIcon;
