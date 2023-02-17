const switchDayLanguage = (formattedDay, language) => {
  if (language === "en") {
    if (formattedDay.toLowerCase() === "lundi") {
      return "Monday";
    } else if (formattedDay.toLowerCase() === "mardi") {
      return "Tuesday";
    } else if (formattedDay.toLowerCase() === "mercredi") {
      return "Wednesday";
    } else if (formattedDay.toLowerCase() === "jeudi") {
      return "Thursday";
    } else if (formattedDay.toLowerCase() === "vendredi") {
      return "Friday";
    } else if (formattedDay.toLowerCase() === "samedi") {
      return "Saturday";
    } else if (formattedDay.toLowerCase() === "dimanche") {
      return "Sunday";
    }
  } else if (language === "fr") {
    if (formattedDay.toLowerCase() === "monday") {
      return "Lundi";
    } else if (formattedDay.toLowerCase() === "tuesday") {
      return "Mardi";
    } else if (formattedDay.toLowerCase() === "wednesday") {
      return "Mercredi";
    } else if (formattedDay.toLowerCase() === "thursday") {
      return "Jeudi";
    } else if (formattedDay.toLowerCase() === "friday") {
      return "Vendredi";
    } else if (formattedDay.toLowerCase() === "saturday") {
      return "Samedi";
    } else if (formattedDay.toLowerCase() === "sunday") {
      return "Dimanche";
    }
  } else {
    return formattedDay;
  }
};
export default switchDayLanguage;
