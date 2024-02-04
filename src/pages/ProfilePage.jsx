import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import '../css/ProfilePage.css'

import { useState, useEffect } from 'react'

import { Footer } from '../components/Footer.jsx'


import { summonerNameApi, getLastMatches } from '../api/apiCalls.jsx'


import { Header } from '../components/Header.jsx'
import { GameInfo } from '../components/GameInfo.jsx'
import { HeadProfile } from '../components/HeadProfile.jsx'
import { SummonerNavbar } from '../components/SummonerNavbar.jsx'

import { RankedsProfileStats } from '../components/RankedsProfileStats.jsx'


import {regionName} from "../components/RegionValue";






export function ProfilePage() {
  const { reg, summonerName } = useParams();
  const [summonerInfo, setSummoner] = useState(); 
  const [matches, setMatches] = useState(); 
  const [matchesCount, setMatchesCount] = useState(10); 
  const [summonerNotFound, setSummonerNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const getSummonerInfo = async () => {
    try {
      const sumApiInfo = await summonerNameApi({ reg, summonerName }); // Make sure to call your API function
      setSummoner(sumApiInfo);
      // const summonerPuuid = summonerInfo.puuid
      
      console.log(sumApiInfo)
      const lastMatches = await getLastMatches({ summonerPuuid: sumApiInfo.puuid , numMatches: matchesCount})
      
      // console.log(lastMatches)
      setMatches(lastMatches)
      
      setMatchesCount(matchesCount+10)

      setLoading(false)
    } catch (e) {
      setSummonerNotFound(true);
      setLoading(false)
      console.log("summoner not found ",e)
    } 
  };

  const handleAddMoreMatches = async () => {
    try {
      const lastMatches = await getLastMatches({ summonerPuuid: summonerInfo.puuid , numMatches: matchesCount})
      
      // console.log(lastMatches)
    
      setMatches([...matches, ...lastMatches]);



      setMatchesCount(matchesCount+10)


    } catch (e) {
      console.log("error ",e)
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
      {loading ?  <h1 style={{marginTop: "100px"}}>Loading...</h1>  :

          (summonerNotFound ? 
          <div className="summonerNotFoundDiv">
            <span>No search result for "<span>{summonerName}</span>" in the {regionName({region: reg})} region</span>
            <p>Please double-check the game name and region, and try again.</p>
          </div> 
          :
          <>
            <div className="row headProfile">
              <HeadProfile summonerInfo={summonerInfo} />
            </div>
            <SummonerNavbar />
            <div className="row bodyProfile">
              <div className='col-3 summonerStats'>
                <RankedsProfileStats reg={reg} summonerId={summonerInfo.id} />
              </div>
              <div className='col-9 summonerHistory'>
                {
                  matches.map(match => {
                    return (
                      <GameInfo summonerInfo={summonerInfo} matchInfo={match} region={reg} key={match.metadata.matchId} />
                    )
                  })


                }
                <div>
                  <button onClick={handleAddMoreMatches} className="showMoreButton">Show More</button>
                </div>
              </div>

            </div>



            
          </>)

      }
      </main>
        <Footer />
    </>
  );
}


export default ProfilePage 