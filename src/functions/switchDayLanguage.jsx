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
  } else {
    return formattedDay;
  }
};
export default switchDayLanguage;
