import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import '../css/ProfilePage.css'

import { useState, useEffect } from 'react'

import { Footer } from '../components/Footer.jsx'


import { getSummonerInfoByPuuid, summonerNameApi, getSummonerSpectatorGameInfo, getSummonerStats } from '../api/apiCalls.jsx'


import { Header } from '../components/Header.jsx'
import { HeadProfile } from '../components/HeadProfile.jsx'
import { SummonerNavbar } from '../components/SummonerNavbar.jsx'


import { LiveGame } from '../components/LiveGame.jsx'


import {regionName} from "../components/RegionValue";





export function LiveGamePage() {
  const { reg, summonerName } = useParams();
  const [summonerInfo, setSummoner] = useState(); // Initialize the state with null or an initial value
  const [summonerSpectatorInfo, setSummonerSpectatorInfo] = useState(); // Initialize the state with null or an initial value
  const [summonerNotInGame, setSummonerNotInGame] = useState(false);
  const [summonerNotFound, setSummonerNotFound] = useState(false);
  const [loading, setLoading] = useState(true);


  const getSummonerInfo = async () => {
    try {
      const sumApiInfo = await summonerNameApi({ reg, summonerName }); // Make sure to call your API function
      setSummoner(sumApiInfo);
      const sumApiSpectatorInfo = await getSummonerSpectatorGameInfo({ reg, summonerId: sumApiInfo.id }); // Make sure to call your API function
      console.log(sumApiSpectatorInfo)
      if (sumApiSpectatorInfo === "Summoner not in game") {
        setSummonerNotInGame(true);
        setLoading(false);
        return
      }


      const updateParticipants = async (sumApiSpectatorInfo) => {
        const updatedParticipants = await Promise.all(
          sumApiSpectatorInfo.participants.map(async (participant) => {
            try {

              const participantRankStats = await getSummonerStats({ reg, summonerId: participant.summonerId });


              const summonerStatsSolo = participantRankStats.find(queue => (queue.queueType === "RANKED_SOLO_5x5"))
              const summonerStatsFlex = participantRankStats.find(queue => (queue.queueType === "RANKED_FLEX_SR"))


              if (summonerStatsSolo == undefined) {
                participant =  { ...participant, tierSolo: 'Unranked'};

              } else {
                participant = { ...participant, tierSolo: summonerStatsSolo.tier, lpSolo: summonerStatsSolo.leaguePoints, rankSolo: summonerStatsSolo.rank, winsSolo: summonerStatsSolo.wins, lossesSolo: summonerStatsSolo.losses };

              }

              if (summonerStatsFlex == undefined) {
                participant = { ...participant, tierFlex: 'Unranked'};

              } else {
                participant = { ...participant, tierFlex: summonerStatsFlex.tier, lpFlex: summonerStatsFlex.leaguePoints, rankFlex: summonerStatsFlex.rank, winsFlex: summonerStatsFlex.wins, lossesFlex: summonerStatsFlex.losses };

              }

              return participant

            } catch (error) {
              console.error('Error al actualizar participante:', error);
              return participant;
            }
          })
        );

        return updatedParticipants
      };
      const updateParticipantsInfo = await updateParticipants(sumApiSpectatorInfo)
      console.log(updateParticipantsInfo)

      sumApiSpectatorInfo.participants = updateParticipantsInfo

      setSummonerSpectatorInfo(sumApiSpectatorInfo)


      setLoading(false);
    } catch (e) {
      console.log('Summoner not found', e)
      setSummonerNotFound(true);
      setLoading(false);
    } finally {
      // You should set the loading state here if you have a 'setLoading' function
    }
  };

  // Call the function to fetch the summoner info
  useEffect(() => {
    getSummonerInfo();
  }, []);

  console.log(summonerNotFound)
  console.log(summonerNotInGame)

  return (
    <>
      <Header />
      <main>
      {

        (summonerInfo === undefined) ? <h1 style={{marginTop: "100px"}}>Loading...</h1>  :
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
            <div className="row liveGame">
              {loading ? (
                <div>Loading...</div>
              ) : (

                summonerNotInGame ? (
                  <div className="summonerNotInGameDiv">
                    <span>{summonerName} is not in an active game</span>
                    <p> Feel free to retry later in case the summoner is currently in a match.</p>
                   
                  </div>
                ):(
                <LiveGame summonerInfo={summonerInfo} liveGameInfo={summonerSpectatorInfo} />)
                
                )}
            </div>


            

          </>
        )
      }
      </main>
      <Footer />
    </>
  );
}


export default LiveGamePage 