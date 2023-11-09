import React, { useState, useEffect } from 'react';

import '../css/LiveGame.css'
import 'bootstrap/dist/css/bootstrap.css';


import { SummonerSpellIconUrl, RuneIconUrl } from '../api/apiCalls.jsx'
import { GetChampionImg } from '../api/dataCalls.jsx'

import { GetPrimaryRunes, GetSecondaryRunes, RunesStats } from '../components/RunesTemplate.jsx'
import { TimeCounter } from '../components/TimeCounter.jsx'

import { summonerNameApi, getSummonerStats, TierMiniIconUrl } from '../api/apiCalls.jsx'


import { ProgressBarWinRate } from '../components/ProgressBar.jsx';



async function getSummonerRankedInfo({ reg, summonerName }) {
    const [sumRankApiInfo, setSumRankApiInfo] = useState(null); // Inicializa con null

    useEffect(() => {
        async function fetchData() {
            try {
                // Llama a las funciones y espera a que se resuelvan
                const sumApiInfo = await summonerNameApi({ reg, summonerName });
                const rankInfo = await getSummonerStats({ reg, summonerId: sumApiInfo.id });

                // Almacena la información en el estado local
                setSumRankApiInfo(rankInfo);
            } catch (error) {
                console.error('Error al obtener información del invocador:', error);
            }
        }

        fetchData();
    }, [reg, summonerName]);

    return (
        <div className='elo'>
            {sumRankApiInfo && sumRankApiInfo.length > 0 && sumRankApiInfo[0].tier}
        </div>
    );
}


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

    const puuid = summonerInfo.puuid

    const summonerMatch = liveGameInfo.participants.find(p => p.puuid === puuid)




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

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const romanToArabicMap = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4
    }


    function calculateWinRate({ wins, losses }) {
        return (
            ((wins / (wins + losses)) * 100).toFixed(1)
        )
    }

    return (

        <>



            <div className='liveGameInfo'>
                <div className='gameType'>
                    {queueIdMap[liveGameInfo.gameQueueConfigId]} | {mapIdMap[liveGameInfo.mapId]} | {<TimeCounter initialTime={liveGameInfo.gameLength} />}
                </div>
                <div className="row-header team1">
                    <div>
                        Blue Team
                    </div>
                    <div>EloSolo</div>
                    <div>RankdedSolo</div>
                    <div>EloFlex</div>
                    <div>RankdedFlex</div>
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
                                        <RuneIconUrl runeIconId={participant.perks.perkIds[0]} />

                                    </div>
                                    <div>
                                        <RuneIconUrl runeIconId={participant.perks.perkSubStyle} />

                                    </div>
                                </div>
                                <div className='summonerName'>
                                    <a href={"http://localhost:5173/profile/EUW1/" + participant.summonerName} target="_blank" rel="noopener noreferrer">
                                        {participant.summonerName}
                                    </a>
                                </div>
                            </div>

                            <div className='summonerRankedInfo'>
                                {
                                    participant.tierSolo === 'Unranked' ?
                                        (
                                            <>
                                                <div className='elo'>
                                                    Unranked
                                                </div>
                                                <div className='rankwinrate'>
                                                    -
                                                </div>
                                            </>) :
                                        (
                                            <>
                                                <div className='elo'>
                                                    <TierMiniIconUrl tier={participant.tierSolo} /> {capitalizeFirstLetter(participant.tierSolo)} {romanToArabicMap[participant.rankSolo]} {participant.lpSolo} LP
                                                </div>
                                                <div className='rankwinrate'>
                                                    <div className='winRate'>
                                                        {calculateWinRate({ wins: participant.winsSolo, losses: participant.lossesSolo })}% ({participant.winsSolo + participant.lossesSolo} games)
                                                    </div>
                                                    <div>
                                                        < ProgressBarWinRate win={calculateWinRate({ wins: participant.winsSolo, losses: participant.lossesSolo })} />
                                                    </div>

                                                </div>
                                            </>)


                                }
                            </div>

                            <div className='summonerRankedInfo'>
                                {
                                    participant.tierFlex === 'Unranked' ?
                                        (
                                            <>
                                                <div className='elo'>
                                                    Unranked
                                                </div>
                                                <div className='rankwinrate'>
                                                    -
                                                </div>
                                            </>) :
                                        (
                                            <>
                                                <div className='elo'>
                                                    <TierMiniIconUrl tier={participant.tierFlex} /> {capitalizeFirstLetter(participant.tierFlex)} {romanToArabicMap[participant.rankFlex]} {participant.lpFlex} LP
                                                </div>
                                                <div className='rankwinrate'>
                                                    <div className='winRate'>
                                                        {calculateWinRate({ wins: participant.winsFlex, losses: participant.lossesFlex })}% ({participant.winsFlex + participant.lossesFlex} games)
                                                    </div>
                                                    <div>
                                                        < ProgressBarWinRate win={calculateWinRate({ wins: participant.winsFlex, losses: participant.lossesFlex })} />
                                                    </div>

                                                </div>
                                            </>)


                                }
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
                    <div>EloSolo</div>
                    <div>RankdedSolo</div>
                    <div>EloFlex</div>
                    <div>RankdedFlex</div>
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
                                        <RuneIconUrl runeIconId={participant.perks.perkIds[0]} />

                                    </div>
                                    <div>
                                        <RuneIconUrl runeIconId={participant.perks.perkSubStyle} />

                                    </div>
                                </div>
                                <div className='summonerName'>
                                    <a href={"http://localhost:5173/profile/EUW1/" + participant.summonerName} target="_blank" rel="noopener noreferrer">
                                        {participant.summonerName}
                                    </a>
                                </div>
                            </div>

                            <div className='summonerRankedInfo'>
                                {
                                    participant.tierSolo === 'Unranked' ?
                                        (
                                            <>
                                                <div className='elo'>
                                                    Unranked
                                                </div>
                                                <div className='rankwinrate'>
                                                    -
                                                </div>
                                            </>) :
                                        (
                                            <>
                                                <div className='elo'>
                                                    <TierMiniIconUrl tier={participant.tierSolo} /> {capitalizeFirstLetter(participant.tierSolo)} {romanToArabicMap[participant.rankSolo]} {participant.lpSolo} LP
                                                </div>
                                                <div className='rankwinrate'>
                                                    <div className='winRate'>
                                                        {calculateWinRate({ wins: participant.winsSolo, losses: participant.lossesSolo })}% ({participant.winsSolo + participant.lossesSolo} games)
                                                    </div>
                                                    <div>
                                                        < ProgressBarWinRate win={calculateWinRate({ wins: participant.winsSolo, losses: participant.lossesSolo })} />
                                                    </div>

                                                </div>
                                            </>)


                                }
                            </div>

                            <div className='summonerRankedInfo'>
                                {
                                    participant.tierFlex === 'Unranked' ?
                                        (
                                            <>
                                                <div className='elo'>
                                                    Unranked
                                                </div>
                                                <div className='rankwinrate'>
                                                    -
                                                </div>
                                            </>) :
                                        (
                                            <>
                                                <div className='elo'>
                                                    <TierMiniIconUrl tier={participant.tierFlex} /> {capitalizeFirstLetter(participant.tierFlex)} {romanToArabicMap[participant.rankFlex]} {participant.lpFlex} LP
                                                </div>
                                                <div className='rankwinrate'>
                                                    <div className='winRate'>
                                                        {calculateWinRate({ wins: participant.winsFlex, losses: participant.lossesFlex })}% ({participant.winsFlex + participant.lossesFlex} games)
                                                    </div>
                                                    <div>
                                                        < ProgressBarWinRate win={calculateWinRate({ wins: participant.winsFlex, losses: participant.lossesFlex })} />
                                                    </div>

                                                </div>
                                            </>)


                                }
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