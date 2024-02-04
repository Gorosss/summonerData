
export function regionValue({ region }) {

    const regionValueMap = {
        euw: "EUW1",
        br: "BR1",
        eun: "EUN1",
        jp: "JP1",
        kr: "KR",
        lan: "LA1",
        las: "LA2",
        na: "NA1",
        oc: "OC1",
        ru: "RU",
        tr: "TR1",
      };
      
    return regionValueMap[region]

}



export function regionName({ region }) {

  const regionNameMap = {
      euw: "Europe West",
      br: "Brazil",
      eun: "Europe Nordic & East",
      jp: "Japan",
      kr: "Korea",
      lan: "LAN",
      las: "LAS",
      na: "North America",
      oc: "Oceania ",
      ru: "Russia",
      tr: "Türkiye",
    };
    
  return regionNameMap[region]

}

export function continentValue({ region }) {

  const continentValueMap = {
      euw: "europe",
      br: "americas",
      eun: "europe",
      jp: "asia",
      kr: "asia",
      lan: "americas",
      las: "americas",
      na: "americas",
      oc: "sea ",
      ru: "europe",
      tr: "asia",
    };
    
  return continentValueMap[region]

}




export default regionValue