export const unixToDate = unix => {
  if (unix) {
    const toHumanDate = new Date(unix * 1000);
    const year = toHumanDate.getFullYear();
    const month = toHumanDate.getMonth() + 1;
    const day = toHumanDate.getDate();
    const hours = toHumanDate.getHours();
    const minutes = toHumanDate.getMinutes();
    const seconds = toHumanDate.getSeconds();
    const timezone = toHumanDate.toString().match(/([A-Z]+[+-][0-9]+)/)[1];
    return `${month}/${day}/${year} at ${hours === 0 ? "00" : hours}:${
      minutes === 0 ? "00" : minutes
    }:${seconds === 0 ? "00" : seconds} (${timezone})`;
  }
  return "";
};

// https://en.wikipedia.org/wiki/Season#Meteorological
export const getActualSeason = lat => {
  if (lat) {
    const actualMonth = new Date().getMonth();
    const seasonIndex = Math.floor(((actualMonth + 1) / 12) * 4) % 4;
    if (lat > 0) {
      const seasons = ["Winter", "Spring", "Summer", "Autumn"];
      return seasons[seasonIndex];
    } else {
      const seasons = ["Summer", "Autumn", "Winter", "Spring"];
      return seasons[seasonIndex];
    }
  }
  return "";
};

export const toFixed = number => {
  if (number) {
    return number.toFixed(2);
  }
  return number;
};
