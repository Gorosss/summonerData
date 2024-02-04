import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import '../css/ProfilePage.css'

import { useState, useEffect } from 'react'

import { Footer } from '../components/Footer.jsx'


import { summonerNameApi, getSummonerChamMasteryPoints } from '../api/apiCalls.jsx'


import { Header } from '../components/Header.jsx'
import { HeadProfile } from '../components/HeadProfile.jsx'
import { SummonerNavbar } from '../components/SummonerNavbar.jsx'
import { MasteryChampionList } from '../components/MasteryChampionList.jsx'


import {regionName} from "../components/RegionValue";








export function HistoryProfile() {

}

export function StatsProfile() {

}


export function SummonerMasteryPage() {
  const { reg, summonerName } = useParams();
  const [summonerInfo, setSummoner] = useState(); 
  const [summonerMasteryInfo, setSummonerMasteryInfo] = useState(); 
  const [summonerNotFound, setSummonerNotFound] = useState(false);
  const [loading, setLoading] = useState(true);


  const getSummonerInfo = async () => {
    try {
      const sumApiInfo = await summonerNameApi({ reg, summonerName }); // Make sure to call your API function
      setSummoner(sumApiInfo);
      const lastMatches = await getSummonerChamMasteryPoints({ reg, summonerId: sumApiInfo.puuid })
      setSummonerMasteryInfo(lastMatches)
      setLoading(false)
    } catch (e) {
      setSummonerNotFound(true);
      setLoading(false)
      console.log("summoner not found ",e)    } finally {
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
      <main>
      {

        (summonerInfo === undefined) ? <h1 style={{marginTop: "100px"}}>Loading...</h1> :

        summonerNotFound ? 
        <div className="summonerNotFoundDiv">
            <span>No search result for "<span>{summonerName}</span>" in the {regionName({region: reg})} region</span>
            <p>Please double-check the game name and region, and try again.</p>
          </div> 
        : (

          <>
            <div className="row headProfile">
              <HeadProfile summonerInfo={summonerInfo} />
            </div>
            <SummonerNavbar />
            <div className="row masteryChampList">
            {loading ? (
                <div>Loading...</div>
              ) : (
                <MasteryChampionList masteryChampionList={summonerMasteryInfo}/>
                )}
            </div>




          </>)

      }
      </main>
       <Footer />
    </>
  );
}


export default SummonerMasteryPage 