
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

export default regionValue