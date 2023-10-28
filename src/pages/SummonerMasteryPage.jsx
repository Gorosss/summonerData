import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import '../css/ProfilePage.css'

import { useState, useEffect } from 'react'



import { summonerNameApi, getLastMatches } from '../api/apiCalls.jsx'


import { Header } from '../components/Header.jsx'
import { HeadProfile } from '../components/HeadProfile.jsx'
import { SummonerNavbar } from '../components/SummonerNavbar.jsx'
import { MasteryChampionList } from '../components/MasteryChampionList.jsx'


import MasteryPoints from '../jsons/champMastery.json'








export function HistoryProfile() {

}

export function StatsProfile() {

}


export function SummonerMasteryPage() {
  const { reg, summonerName } = useParams();
  const [summonerInfo, setSummoner] = useState(); // Initialize the state with null or an initial value

  const getSummonerInfo = async () => {
    try {
      const sumApiInfo = await summonerNameApi({ reg, summonerName }); // Make sure to call your API function
      setSummoner(sumApiInfo);
      const summonerPuuid = summonerInfo.puuid
      const lastMatches = await getLastMatches({ summonerPuuid })
      setMatches(lastMatches)
    } catch (e) {
      // Handle errors here
    } finally {
      // You should set the loading state here if you have a 'setLoading' function
    }
  };

  // Call the function to fetch the summoner info
  useEffect(() => {
    getSummonerInfo();
  }, []);

  console.log(summonerInfo)

  return (
    <>
      <Header />
      
      {

        (summonerInfo === undefined) ? <h1>Cagando</h1> :

          <>
            <div className="row headProfile">
              <HeadProfile summonerInfo={summonerInfo} />
            </div>
            <SummonerNavbar />
            <div className="row masteryChampList">
              <MasteryChampionList masteryChampionList={MasteryPoints}/>
            </div>




          </>

      }

    </>
  );
}


export default SummonerMasteryPage 