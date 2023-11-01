import React from 'react';

import '../css/LiveGame.css'
import 'bootstrap/dist/css/bootstrap.css';


import { ChampIconUrl, ItemsIconsUrl, SummonerSpellIconUrl, RuneIconUrl } from '../api/apiCalls.jsx'

import { ProgressBarDMG } from '../components/ProgressBar.jsx';





export function LiveGame({ summonerInfo, liveGameInfo }) {



    const queueIdMap = {
        400: "Normal",
        420: "Ranked Solo",
        440: "Ranked Flex",
        450: "ARAM",
        460: "Ranked Flex (3v3)",
        900: "URF",
        950: "ARURF",
    };


    console.log(liveGameInfo)

    const puuid = liveGameInfo.participants[0].puuid

    const summonerMatch = liveGameInfo.participants.find(p => p.puuid === puuid)

    
    const index = liveGameInfo.participants.findIndex(p => p.puuid === puuid);


    const team1 = index < 5 ? liveGameInfo.participants.slice(0, 5) : liveGameInfo.participants.slice(5);
    const team2 = index < 5 ? liveGameInfo.participants.slice(5) : liveGameInfo.participants.slice(0, 5);

    return (

        <>
           


                <div className='liveGameInfo'>
                    <div className='gameType'></div>
                    <div class="row-header team1">
                        <div>
                            {summonerMatch.teamId == 100 ? "(Blue Side)" : "(Red Side)"}

                        </div>
                        <div>Elo</div>
                        <div>Rankded</div>
                        <div>Ban</div>
                    </div>
                    {team1.map(participant => (
                        <div key={participant.id} className={`participant team1 ${participant.puuid === summonerMatch.puuid ? "summoner" : ""}`}>



                            <div className='summoner'>

                                <div className='champ'>
                                    <ChampIconUrl champIconName={participant.championName} />

                                </div>
                                <div className='summonerSpells'>
                                    <SummonerSpellIconUrl summonerSpeelIconId={participant.spell1Id} />
                                    <SummonerSpellIconUrl summonerSpeelIconId={participant.spell2Id} />
                                </div>

                                <div className='summonerRunes'>
                                    <RuneIconUrl runeIconId={participant.perks.perkStyle} />
                                    <RuneIconUrl runeIconId={participant.perks.perkSubStyle} />
                                </div>

                            </div>
                            <div className='summonerName'>{participant.summonerName} </div>

                        </div>
                    ))}
                    <div class="row-header team2">
                        <div>
                            {summonerMatch.teamId == 100 ? "(Red Side)" : "(Blue Side)"}
                        </div>
                        <div>Elo</div>
                        <div>Rankded</div>
                        <div>Ban</div>
                    </div>
                    {team2.map(participant => (
                        <div key={participant.id} className='participant team2'>



                            <div className='summoner'>

                                <div className='champ'>
                                    <ChampIconUrl champIconName={participant.championName} />
                                </div>
                                <div className='summonerSpells'>
                                    <SummonerSpellIconUrl summonerSpeelIconId={participant.spell1Id} />
                                    <SummonerSpellIconUrl summonerSpeelIconId={participant.spell2Id} />
                                </div>

                                <div className='summonerRunes'>
                                    <RuneIconUrl runeIconId={participant.perks.perkStyle} />
                                    <RuneIconUrl runeIconId={participant.perks.perkSubStyle} />
                                </div>

                            </div>
                            <div className='summonerName'>{participant.summonerName} </div>

                            




                        </div>
                    ))}
                </div>



        


        </>
    )

}


export default LiveGame