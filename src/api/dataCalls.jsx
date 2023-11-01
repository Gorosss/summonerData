
import champData from "../data/13.21.1/data/en_US/champion.json";


let champList = champData.data;


export function GetChampionImg(championId) {

    var champName = "";
    for (var i in champList) {
        console.log(champList[i].key)
      if (champList[i].key == championId.championId) {
        champName = champList[i].id;
      }
  
    }
  
    if(champName!=''){
      return <img src={`http://localhost:5173/src/data/13.21.1/img/champion/${champName}.png`} width={32} height={32}/>;
    }
    return '';
  
  }