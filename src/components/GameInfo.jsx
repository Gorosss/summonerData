import React, { useState } from 'react';

import '../css/GameInfo.css'
import 'bootstrap/dist/css/bootstrap.css';


import { ChampIconUrl, ItemsIconsUrl, SummonerSpellIconUrl, RuneIconUrl } from '../api/apiCalls.jsx'

import { ProgressBarDMG } from '../components/ProgressBar.jsx';
import { SummonersList } from '../components/SummonersList.jsx';

import { CalculateElapsedTime } from '../components/CalculateElapsedTime.jsx';




export function GameInfo({ summonerInfo, matchInfo }) {

    


    const [showGameInfo, setShowGameInfo] = useState(false);

    const toggleGameInfo = () => {
        setShowGameInfo(!showGameInfo);
    };

    const queueIdMap = {
        400: "Normal",
        420: "Ranked Solo",
        440: "Ranked Flex",
        450: "ARAM",
        460: "Ranked Flex (3v3)",
        900: "URF",
        950: "ARURF",
      };

    const match = matchInfo.info


    const puuid = summonerInfo.puuid

    const summonerMatch = match.participants.find(p => p.puuid === puuid)

    const maxDMG = Math.max(...match.participants.map(p => p.totalDamageDealtToChampions));

    return (

        <>
            <div className={ summonerMatch.win ? 'game win' : 'game loss'} >


                <div className='match'>
                    <div className='matchInfo'>
                        <div className='col gameData'>
                            <div>
                                {queueIdMap[match.queueId]}
                            </div>
                            <div>
                            <CalculateElapsedTime gameEndTimestamp={match.gameEndTimestamp} />

                            </div>
                            <div>
                                {
                                    summonerMatch.win ? (
                                        <>
                                        WIN
                                        {Math.round(match.gameDuration / 60)}

                                        </>
                                    ):(
                                        <>
                                        LOSS
                                        {Math.round(match.gameDuration / 60)}

                                        </>

                                    )
                                }
                            
                            </div>
                             
                        </div>
                        <div className='col summoner'>
                            <div className='summonerChamp'>
                                <ChampIconUrl champIconName={summonerMatch.championName} />

                                <div className='summonerChampLevel'>
                                    {summonerMatch.champLevel}
                                </div>

                            </div>
                            <div className='summonerSpells'>
                                <SummonerSpellIconUrl summonerSpeelIconId={summonerMatch.summoner1Id} />
                                <SummonerSpellIconUrl summonerSpeelIconId={summonerMatch.summoner2Id} />
                            </div>
                            <div className='summonerRunes'>
                                <RuneIconUrl runeIconId={summonerMatch.perks.styles[0].selections[0].perk} />
                                <RuneIconUrl runeIconId={summonerMatch.perks.styles[1].style} />
                            </div>
                        </div>

                        <div className='col kda'>
                            <div>
                                {summonerMatch.kills}/{summonerMatch.deaths}/{summonerMatch.assists}
                            </div>
                            <div>
                                {((summonerMatch.kills + summonerMatch.assists) / summonerMatch.deaths).toFixed(1)} KDA
                            </div>
                            <div >
                                {summonerMatch.totalMinionsKilled + summonerMatch.neutralMinionsKilled} ({((summonerMatch.totalMinionsKilled + summonerMatch.neutralMinionsKilled) / (match.gameDuration / 60)).toFixed(1)}) CS
                            </div>
                        </div>
                        <div className='col killParticipation'>
                            XXX % KP
                        </div>
                        <div className='col summonerItems'>

                            {
                                Array.from({ length: 7 }, (_, index) => (
                                    <ItemsIconsUrl itemIconId={summonerMatch[`item${index}`]} item={[`item${index}`]} />
                                ))
                            }

                        </div>

                        <div className='col summonersList'>
                            <SummonersList matchParticipants={match.participants} />
                        </div>


                    </div>
                    <div className='showMatch'>
                        <button onClick={toggleGameInfo}>{showGameInfo ? "⇑" : "⇓"}</button>
                    </div>
                </div>

                {showGameInfo &&
                    (<div className='gameInfo'>
                        {match.participants.map(participant => (
                            <div key={participant.id} className='participant'>



                                <div className='summoner'>

                                    <div className='champ'>
                                        <ChampIconUrl champIconName={participant.championName} />

                                        <div className='champLevel'>
                                            {participant.champLevel}
                                        </div>
                                    </div>
                                    <div className='summonerSpells'>
                                        <SummonerSpellIconUrl summonerSpeelIconId={participant.summoner1Id} />
                                        <SummonerSpellIconUrl summonerSpeelIconId={participant.summoner2Id} />
                                    </div>

                                    <div className='summonerRunes'>
                                        <RuneIconUrl runeIconId={participant.perks.styles[0].selections[0].perk} />
                                        <RuneIconUrl runeIconId={participant.perks.styles[1].style} />
                                    </div>

                                </div>
                                <div className='summonerName'>{participant.summonerName} </div>


                                <div className='kda'>{participant.kills}/{participant.deaths}/{participant.assists}</div>
                                <div className='cs'>CS {participant.totalMinionsKilled + participant.neutralMinionsKilled}</div>

                                <div className='dmg'>
                                    DMG {participant.totalDamageDealtToChampions}
                                    <ProgressBarDMG dmg={participant.totalDamageDealtToChampions} maxDmg={maxDMG} />
                                </div>
                                <div className='items'>
                                    {
                                        Array.from({ length: 7 }, (_, index) => (
                                            <ItemsIconsUrl itemIconId={participant[`item${index}`]} />
                                        ))
                                    }

                                </div>




                            </div>
                        ))}
                    </div>)
                }


            </div>


        </>
    )

}


export default GameInfo