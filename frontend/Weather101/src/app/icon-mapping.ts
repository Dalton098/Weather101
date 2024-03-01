
const translationList : {[key: string]: string} = {
  "Sunny" : "sunny",
  "Clear" : "sunny",
  "Partly Cloudy" : "partly_cloudy_day",
  "Mostly Cloudy" : "partly_cloudy_day",
  "Cloudy" : "cloud",
  "Snow" : "ac_unit" ,
  "Wind" : "air",
  "Rain" : "rainy",
  "Shower" : "rainy",
  "Thunderstorm" : "thunderstorm",
  "Fog" : "foggy"
};

function getTranslation(toTranslate:string) : string {

  for (let translation in translationList) {

    if (toTranslate.includes(translation)) {
      return translationList[translation];
    }
    
  }
  return "sunny";

}

export { getTranslation };