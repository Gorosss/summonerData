import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import '../css/ProfilePage.css'

import { useState, useEffect } from 'react'



import { summonerNameApi, getLastMatches } from '../api/apiCalls.jsx'


import { Header } from '../components/Header.jsx'
import { GameInfo } from '../components/GameInfo.jsx'
import { HeadProfile } from '../components/HeadProfile.jsx'
import { SummonerNavbar } from '../components/SummonerNavbar.jsx'

import { RankedsProfileStats } from '../components/RankedsProfileStats.jsx'


import MatchTestTocho from '../jsons/matchTestTocho2.json'







export function ProfilePage() {
  const { reg, summonerName } = useParams();
  const [summonerInfo, setSummoner] = useState(); 
  const [matches, setMatches] = useState(); 
  const [matchesCount, setMatchesCount] = useState(10); 
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
      console.log("error ",e)
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
      
      {loading ?  <h1>Cagando</h1> :

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
                      <GameInfo summonerInfo={summonerInfo} matchInfo={match} key={match.metadata.matchId} />
                    )
                  })


                }
                <div>
                  <button onClick={handleAddMoreMatches} className="showMoreButton">Show More</button>
                </div>
              </div>

            </div>




          </>

      }

    </>
  );
}


export default ProfilePage 