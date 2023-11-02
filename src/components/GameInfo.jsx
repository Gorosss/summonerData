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

    const blueTeamKillsSum = match.participants.reduce((totalKills, participant) => {
        if (participant.teamId === 100) {
            return totalKills + participant.kills;
        }
        return totalKills;
    }, 0);

    const redTeamKillsSum = match.participants.reduce((totalKills, participant) => {
        if (participant.teamId === 200) {
            return totalKills + participant.kills;
        }
        return totalKills;
    }, 0);



    const calculateKP = (killAssist, teamId) => {
        console.log(killAssist, teamId)
        if (teamId == 100) {
            return ((killAssist / blueTeamKillsSum) * 100).toFixed(1)
        } else {
            return ((killAssist / redTeamKillsSum) * 100).toFixed(1)

        }
    }


    const index = match.participants.findIndex(p => p.puuid === puuid);


    const team1 = index < 5 ? match.participants.slice(0, 5) : match.participants.slice(5);
    const team2 = index < 5 ? match.participants.slice(5) : match.participants.slice(0, 5);

    return (

        <>
            <div className={summonerMatch.win ? 'game win' : 'game loss'} >


                <div onClick={toggleGameInfo} className='match'>
                    <div className='matchInfo'>
                        <div className='col gameData'>
                            <div className='queueType'>
                                {queueIdMap[match.queueId]}
                            </div>
                            <div className='elapsedTime'>
                                <CalculateElapsedTime gameEndTimestamp={match.gameEndTimestamp} />

                            </div>
                            <div>
                                {
                                    summonerMatch.win ? (
                                        <>
                                            <span className='gameResult win'>WIN</span>
                                            <span className='gameDuration'>{Math.round(match.gameDuration / 60)}:{match.gameDuration % 60}</span>

                                        </>
                                    ) : (
                                        <>
                                            <span className='gameResult loss'>LOSS</span>
                                            <span className='gameDuration'>{Math.round(match.gameDuration / 60)}:{match.gameDuration % 60}</span>

                                        </>

                                    )
                                }

                            </div>

                        </div>
                        <div className='col summoner'>
                            <div className={`summonerChamp ${summonerMatch.win ? 'win' : 'loss'}`}>
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
                                <div>
                                <RuneIconUrl runeIconId={summonerMatch.perks.styles[0].selections[0].perk} />

                                </div>
                                <div>
                                <RuneIconUrl runeIconId={summonerMatch.perks.styles[1].style} />

                                </div>
                            </div>
                        </div>

                        <div className='col gameStats'>
                            <div className='kda'>
                                <span className='kills'>{summonerMatch.kills}</span>
                                /
                                <span className='deaths'>{summonerMatch.deaths}</span>
                                /
                                <span className='assists'>{summonerMatch.assists}</span>
                            </div>
                            <div className='kdaSummary'>
                            {
                                         summonerMatch.deaths == 0 ?  
                                        
                                        ((summonerMatch.kills + summonerMatch.assists).toFixed(1))

                                        : ((((summonerMatch.kills + summonerMatch.assists) / summonerMatch.deaths).toFixed(1)))
                                    
                                    
                                    } KDA
                            </div>
                            <div className='cs'>
                                {summonerMatch.totalMinionsKilled + summonerMatch.neutralMinionsKilled} CS ({((summonerMatch.totalMinionsKilled + summonerMatch.neutralMinionsKilled) / (match.gameDuration / 60)).toFixed(1)})
                            </div>
                            <div className='visionScore'>
                                {summonerMatch.visionScore} vision
                            </div>
                        </div>
                        <div className='col killParticipation'>
                            {calculateKP((summonerMatch.kills + summonerMatch.assists), summonerMatch.teamId)}% KP
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
                        <div class="row-header team1">
                            <div>
                                {summonerMatch.win ? (
                                    <span class="status-label ">Victory&nbsp;</span>

                                ) : (

                                    <span class="status-label ">Defeat&nbsp;</span>
                                )}
                                {summonerMatch.teamId == 100 ? "(Blue Side)" : "(Red Side)"}

                            </div>
                            <div>KDA</div>
                            <div>Damage</div>
                            <div>Gold</div>
                            <div class="cs-header">CS</div>
                            <div>
                                <div class="post-items-header">
                                    Items
                                </div>
                            </div>
                        </div>
                        {team1.map(participant => (
                            <div key={participant.id} className={`participant team1 ${participant.puuid === summonerMatch.puuid ? "summoner" : ""}`}>



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
                                        <div>
                                        <RuneIconUrl runeIconId={participant.perks.styles[0].selections[0].perk} />

                                        </div>
                                        <div>
                                        <RuneIconUrl runeIconId={participant.perks.styles[1].style} />

                                        </div>
                                    </div>

                                </div>
                                <div className='summonerName'>{participant.summonerName} </div>


                                <div className='kda'>
                                    <span className='kills'>{participant.kills}</span>
                                    /
                                    <span className='deaths'>{participant.deaths}</span>
                                    /
                                    <span className='assists'>{participant.assists}</span> 
                                    <div>
                                        {
                                         participant.deaths == 0 ?  
                                        
                                        ((participant.kills + participant.assists).toFixed(1))

                                        : ((((participant.kills + participant.assists) / participant.deaths).toFixed(1)))
                                    
                                    
                                    } KDA
                                        </div>                              
                                </div>
                                <div className='dmg'>
                                    {participant.totalDamageDealtToChampions}
                                    <ProgressBarDMG dmg={participant.totalDamageDealtToChampions} maxDmg={maxDMG} />

                                </div>
                                <div className='goldEarned'>
                                    {(participant.goldEarned/1000).toFixed(1)}K
                                </div>
                                <div className='cs'>CS {participant.totalMinionsKilled + participant.neutralMinionsKilled}</div>

                                <div className='items'>
                                    {
                                        Array.from({ length: 7 }, (_, index) => (
                                            <ItemsIconsUrl itemIconId={participant[`item${index}`]} item={[`item${index}`]} />
                                        ))
                                    }

                                </div>




                            </div>
                        ))}
                        <div class="row-header team2">
                            <div>
                                {summonerMatch.win ? (
                                    <span class="status-label ">Defeat&nbsp;</span>

                                ) : (

                                    <span class="status-label ">Victory&nbsp;</span>
                                )}
                                {summonerMatch.teamId == 100 ? "(Red Side)" : "(Blue Side)"}
                            </div>
                            <div>KDA</div>
                            <div>Damage</div>
                            <div>Gold</div>
                            <div class="cs-header">CS</div>
                            <div>
                                <div class="post-items-header">
                                    Items
                                </div>
                            </div>
                        </div>
                        {team2.map(participant => (
                            <div key={participant.id} className='participant team2'>



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
                                        <div>
                                        <RuneIconUrl runeIconId={participant.perks.styles[0].selections[0].perk} />

                                        </div>
                                        <div>
                                        <RuneIconUrl runeIconId={participant.perks.styles[1].style} />
                                            
                                        </div>
                                    </div>

                                </div>
                                <div className='summonerName'>{participant.summonerName} </div>

                                <div className='kda'>
                                    <span className='kills'>{participant.kills}</span>
                                    /
                                    <span className='deaths'>{participant.deaths}</span>
                                    /
                                    <span className='assists'>{participant.assists}</span> 
                                    <div>
                                    {
                                         participant.deaths == 0 ?  
                                        
                                        ((participant.kills + participant.assists).toFixed(1))

                                        : ((((participant.kills + participant.assists) / participant.deaths).toFixed(1)))
                                    
                                    
                                    } KDA                                        </div>                              
                                </div>
                                <div className='dmg'>
                                    {participant.totalDamageDealtToChampions}
                                    <ProgressBarDMG dmg={participant.totalDamageDealtToChampions} maxDmg={maxDMG} />

                                </div>
                                <div className='goldEarned'>
                                    {(participant.goldEarned/1000).toFixed(1)}K
                                </div>
                                <div className='cs'>CS {participant.totalMinionsKilled + participant.neutralMinionsKilled}</div>

                                <div className='items'>
                                    {
                                        Array.from({ length: 7 }, (_, index) => (
                                            <ItemsIconsUrl itemIconId={participant[`item${index}`]} item={[`item${index}`]}/>
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