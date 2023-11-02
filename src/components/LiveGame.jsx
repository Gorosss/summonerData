import React, { useState } from 'react';

import '../css/LiveGame.css'
import 'bootstrap/dist/css/bootstrap.css';


import { SummonerSpellIconUrl, RuneIconUrl } from '../api/apiCalls.jsx'
import { GetChampionImg } from '../api/dataCalls.jsx'

import { GetPrimaryRunes, GetSecondaryRunes, RunesStats } from '../components/RunesTemplate.jsx'
import { TimeCounter } from '../components/TimeCounter.jsx'




export function LiveGame({ summonerInfo, liveGameInfo }) {


    const [activeRunesIndexes, setActiveRunesIndexes] = useState([]);


    const queueIdMap = {
        400: "Normal",
        420: "Ranked Solo",
        440: "Ranked Flex",
        450: "ARAM",
        460: "Ranked Flex (3v3)",
        900: "URF",
        950: "ARURF",
    };

    const mapIdMap = {
        10: "Twisted Treeline",
        11: "Summoner's Rift",
        12: "Howling Abyss",
        14: "Howling Abyss ARAM",
    };


    console.log(liveGameInfo)

    const puuid = liveGameInfo.participants[1].puuid

    const summonerMatch = liveGameInfo.participants.find(p => p.puuid === puuid)


    const index = liveGameInfo.participants.findIndex(p => p.puuid === puuid);


    const team1 = liveGameInfo.participants.slice(0, 5)
    const team2 = liveGameInfo.participants.slice(5)

    const team1Bans = liveGameInfo.bannedChampions.filter((banChamp) => banChamp.teamId === 100)
    const team2Bans = liveGameInfo.bannedChampions.filter((banChamp) => banChamp.teamId === 200)



    const toggleRunes = (puuid) => {
        if (activeRunesIndexes.includes(puuid)) {
            setActiveRunesIndexes(activeRunesIndexes.filter((i) => i !== puuid));
        } else {
            setActiveRunesIndexes([...activeRunesIndexes, puuid]);
        }
    };

    function formatTime(seconds) {
        const minutos = Math.floor(seconds / 60);
        const segundos = seconds % 60;
        return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      }

    return (

        <>



            <div className='liveGameInfo'>
                <div className='gameType'>
                    {queueIdMap[liveGameInfo.gameQueueConfigId]} | {mapIdMap[liveGameInfo.mapId]} | {<TimeCounter initialTime={liveGameInfo.gameLength}/>}
                </div>
                <div className="row-header team1">
                    <div>
                        Blue Team
                    </div>
                    <div>Elo</div>
                    <div>Rankded</div>
                    <div>Runes</div>
                    <div>Bans</div>
                </div>
                {team1.map(participant => (
                    <div key={participant.puuid} className={`liveParticipant team1 ${participant.puuid === summonerMatch.puuid ? "liveSummoner" : ""}`}>


                        <div className='info'>
                            <div className='summoner'>

                                <div className='champ'>
                                    <GetChampionImg championId={participant.championId} />

                                </div>
                                <div className='summonerSpells'>
                                    <SummonerSpellIconUrl summonerSpeelIconId={participant.spell1Id} />
                                    <SummonerSpellIconUrl summonerSpeelIconId={participant.spell2Id} />
                                </div>

                                <div className='summonerRunes'>
                                    <div>
                                        <RuneIconUrl runeIconId={participant.perks.perkStyle} />

                                    </div>
                                    <div>
                                        <RuneIconUrl runeIconId={participant.perks.perkSubStyle} />

                                    </div>
                                </div>

                            </div>
                            <div className='summonerName'>
                                {participant.summonerName}
                            </div>
                            <div className='elo'>
                                summonerElo
                            </div>
                            <div className='rankwinrate'>
                                summonerrankwinrate
                            </div>
                            <div className='runes'>
                                <button onClick={() => toggleRunes(participant.puuid)}>
                                    Runes ▼
                                </button>
                            </div>
                            <div className='ban'>
                                {team1Bans.length > 0 && (
                                    <GetChampionImg championId={team1Bans.shift().championId} />
                                )}

                            </div>
                        </div>


                        {activeRunesIndexes.includes(participant.puuid) &&
                            <div className='runesDisplay'>
                                <div className='primary'>
                                    <GetPrimaryRunes perkStyle={participant.perks.perkStyle} runeId={participant.perks.perkIds[0]} />
                                    <GetSecondaryRunes perkSubStyle={participant.perks.perkStyle} runesIds={participant.perks.perkIds.slice(1, 4)} />
                                </div>
                                <div className="divider"></div>
                                <div className='secondary'>
                                    <GetSecondaryRunes perkSubStyle={participant.perks.perkSubStyle} runesIds={participant.perks.perkIds.slice(4, 6)} />
                                </div>
                                <div className="divider"></div>
                                <div className='runeStats'>
                                    <RunesStats runesIds={participant.perks.perkIds.slice(6, 9)} />
                                </div>
                            </div>
                        }

                    </div>


                ))}
                <div className="row-header team2">
                    <div>
                        Red Team
                    </div>
                    <div>Elo</div>
                    <div>Rankded</div>
                    <div>Runes</div>
                    <div>Ban</div>
                </div>
                {team2.map(participant => (
                    <div key={participant.puuid} className={`liveParticipant team2 ${participant.puuid === summonerMatch.puuid ? "liveSummoner" : ""}`}>



                        <div className='info'>
                            <div className='summoner'>

                                <div className='champ'>
                                    <GetChampionImg championId={participant.championId} />

                                </div>
                                <div className='summonerSpells'>
                                    <SummonerSpellIconUrl summonerSpeelIconId={participant.spell1Id} />
                                    <SummonerSpellIconUrl summonerSpeelIconId={participant.spell2Id} />
                                </div>

                                <div className='summonerRunes'>
                                    <div>
                                        <RuneIconUrl runeIconId={participant.perks.perkStyle} />

                                    </div>
                                    <div>
                                        <RuneIconUrl runeIconId={participant.perks.perkSubStyle} />

                                    </div>
                                </div>

                            </div>
                            <div className='summonerName'>
                                {participant.summonerName}
                            </div>
                            <div className='elo'>
                                summonerElo
                            </div>
                            <div className='rankwinrate'>
                                summonerrankwinrate
                            </div>
                            <div className='runes'>
                                <button onClick={() => toggleRunes(participant.puuid)}>
                                    Runes ▼
                                </button>
                            </div>
                            <div className='ban'>
                                {team2Bans.length > 0 && (
                                    <GetChampionImg championId={team2Bans.shift().championId} />
                                )}
                            </div>
                        </div>


                        {activeRunesIndexes.includes(participant.puuid) &&
                            <div className='runesDisplay'>
                                <div className='primary'>
                                    <GetPrimaryRunes perkStyle={participant.perks.perkStyle} runeId={participant.perks.perkIds[0]} />
                                    <GetSecondaryRunes perkSubStyle={participant.perks.perkStyle} runesIds={participant.perks.perkIds.slice(1, 4)} />
                                </div>
                                <div className="divider"></div>
                                <div className='secondary'>
                                    <GetSecondaryRunes perkSubStyle={participant.perks.perkSubStyle} runesIds={participant.perks.perkIds.slice(4, 6)} />
                                </div>
                                <div className="divider"></div>
                                <div className='runeStats'>
                                    <RunesStats runesIds={participant.perks.perkIds.slice(6, 9)} />
                                </div>
                            </div>
                        }

                    </div>

                ))}
            </div>






        </>
    )

}


export default LiveGame