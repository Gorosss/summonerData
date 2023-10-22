import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import '../css/ProfilePage.css'

import { useState, useEffect } from 'react'



import { summonerNameApi, getLastMatches } from '../api/apiCalls.jsx'


import { GameInfo } from '../components/GameInfo.jsx'
import { HeadProfile } from '../components/HeadProfile.jsx'
import { RankedsProfileStats } from '../components/RankedsProfileStats.jsx'



import MatchTest from '../jsons/matchTest.json'
import MatchTest2 from '../jsons/matchTest2.json'
import MatchTest3 from '../jsons/matchTestTocho.json'






export function HistoryProfile() {

}

export function StatsProfile() {

}


export function ProfilePage() {
  const { reg, summonerName } = useParams();
  const [summonerInfo, setSummoner] = useState(); // Initialize the state with null or an initial value
  const [matches, setMatches] = useState(MatchTest3); // Initialize the state with null or an initial value

  const getSummonerInfo = async () => {
    try {
      const sumApiInfo = await summonerNameApi({ reg, summonerName }); // Make sure to call your API function
      setSummoner(sumApiInfo);
      const summonerPuuid = summonerInfo.puuid
      const lastMatches = await getLastMatches({summonerPuuid})
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
      {
        
        (summonerInfo === undefined) ? <h1>Cagando</h1> :

          <>

            <HeadProfile profileIconId={summonerInfo.profileIconId} summonerName={summonerInfo.name} />
            <div className="row bodyProfile">
              <div className='col-3 summonerStats'>
                <RankedsProfileStats reg={reg} summonerId={summonerInfo.id}/>
              </div>
              <div className='col-9 summonerHistory'>
                {
                  matches.map(match => {
                    return (
                    <GameInfo summonerInfo={summonerInfo} matchInfo={match} key={match.metadata.matchId}/>
                  )
                  })


                }
             
              </div>
            </div>



          </>

      }

    </>
  );
}


export default ProfilePage 