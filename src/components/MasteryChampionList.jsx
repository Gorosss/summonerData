import React from 'react';
import champData from "../data/13.21.1/data/en_US/champion.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MasteryChampionList.css'
import DataTable from 'react-data-table-component';

import { ProgressBarMastery } from '../components/ProgressBar.jsx';






let champList = champData.data;

const columns = [
  {
    name: '#', 
    selector: row => getChampionImg(row.championId),
    sortable: false,
    width: "10%",
  },
  {
    name: 'Champion', 
    selector: row => getChampionName(row.championId),
    sortable: true,
    width: "15%",
  },
  {
    name: 'Level', 
    selector: row => row.championLevel,
    sortable: true,
    width: "9%",
  },
  {
    name: 'Points', 
    selector: row => row.championPoints,
    sortable: true,
    width: "15%",
  },
  {
    name: 'Granted', 
    selector: row => getChestImg(row.chestGranted),
    sortable: false,
    width: "10%",
  },
  {
    name: 'Progression', 
    selector: row => getMasteryProgression(row.championLevel, row.tokensEarned, row.championPointsSinceLastLevel, row.championPointsUntilNextLevel),
    sortable: false,
    width: "20%",
  },
  {
    name: 'Points for next level', 
    selector: row => getPointsUntilNextLvl(row.championLevel, row.championPointsUntilNextLevel),
    sortable: false,
    width: "20%",
  },
]


export function MasteryChampionList({masteryChampionList}) {

  return (
   <DataTable
      columns={columns}
      data = {masteryChampionList}
      defaultSortFieldId = {3}
      defaultSortAsc = {false}
      fixedHeader = {false}
      noDataComponent = {'Insert your summoner name'}
      className="my-custom-table"
      
    />
  );
}

export default MasteryChampionList;

function getChampionName(championId) {
  var champName = "";
  for (var i in champList) {

    if (champList[i].key == championId) {
      champName = champList[i].id;
    }

  }
  return champName;
}

function getChampionImg(championId) {
  var champName = "";
  for (var i in champList) {

    if (champList[i].key == championId) {
      champName = champList[i].id;
    }

  }

  if(champName!=''){
    return <img src={`http://localhost:5173/src/data/13.21.1/img/champion/${champName}.png`} width={32} height={32}/>;
  }
  return '';

}

function getChestImg(chestGranted) {
  if(chestGranted){
    return <img src={`http://localhost:5173/src/data/13.21.1/img/chest/chest.png`}  width={32} height={32}/>;
  }
  return <img className='notEarned' src={`http://localhost:5173/src/data/13.21.1/img/chest/chest.png`}  width={32} height={32}/>;
}

function getPointsUntilNextLvl(masteredLvl,pointsUntilNextLvl) {
  if(masteredLvl < 5 ){
    return pointsUntilNextLvl;
  }else{
    return '-'
  }
}


function getMasteryProgression(masteredLvl, tokensEarned, pointsSinceLastLevel,pointsUntilNextLvl) {

  if (masteredLvl==7) {
    return ('Mastered');
  }else if (masteredLvl == 6) {
    return getMasteryTokens(tokensEarned,masteredLvl);
  }else if (masteredLvl == 5) {
    return getMasteryTokens(tokensEarned,masteredLvl);
  }else {
    return (<ProgressBarMastery pointsEarned={pointsSinceLastLevel} pointsToNextLevel={pointsUntilNextLvl}/>);
  }
}

function getMasteryTokens(tokens,mastery){
  var buffer = [];
  if (mastery == 6) { 
    for (let index = 0; index < tokens; index++) {
      buffer.push(<img src={`http://localhost:5173/src/data/13.21.1/img/masteryicon/m7.png`}  width={32} height={32} onMouseOver="asdfasf"/>); 
    }    
  }else{
    for (let index = 0; index < tokens; index++) {
      buffer.push(<img src={`http://localhost:5173/src/data/13.21.1/img/masteryicon/m6.png`}  width={32} height={32}/>); 
    }  
  }
  for (let index = 0; index < 3-tokens; index++) {
    buffer.push(<img className='notEarned' src={`http://localhost:5173/src/data/13.21.1/img/masteryicon/m6.png`}  width={32} height={32}/>); 
  }      
  return (<div>
    {buffer}
  </div>);
}