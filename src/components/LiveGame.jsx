import React from 'react';

import '../css/LiveGame.css'
import 'bootstrap/dist/css/bootstrap.css';


import { SummonerSpellIconUrl, RuneIconUrl } from '../api/apiCalls.jsx'
import { GetChampionImg } from '../api/dataCalls.jsx'

import { PrimaryDominationRune, SecondaryDominationRune, RunesStats} from '../components/RunesTemplate.jsx'




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

    return (

        <>



            <div className='liveGameInfo'>
                <div className='gameType'>
                    {queueIdMap[liveGameInfo.gameQueueConfigId]} | {mapIdMap[liveGameInfo.mapId]} | {liveGameInfo.gameLength}
                </div>
                <div class="row-header team1">
                    <div>
                        Blue Team

                    </div>
                    <div>Elo</div>
                    <div>Rankded</div>
                    <div>Runes</div>
                    <div>Bans</div>
                </div>
                {team1.map(participant => (
                    <div key={participant.id} className={`liveParticipant team1 ${participant.puuid === summonerMatch.puuid ? "liveSummoner" : ""}`}>


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
                                    <RuneIconUrl runeIconId={participant.perks.perkStyle} />
                                    <RuneIconUrl runeIconId={participant.perks.perkSubStyle} />
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
                                <button>
                                    Runes ▼
                                </button>
                            </div>
                            <div className='ban'>
                                <GetChampionImg championId={participant.championId} />
                            </div>
                        </div>



                        <div className='runesDisplay'>
                            <div className='primary'>
                                <PrimaryDominationRune />
                                <SecondaryDominationRune />
                            </div>
                            <div class="divider"></div>
                            <div className='secondary'>
                                <SecondaryDominationRune />
                            </div>
                            <div class="divider"></div>
                            <div className='runeStats'>
                                <RunesStats />
                            </div>
                        </div>

                    </div>


                ))}
                <div class="row-header team2">
                    <div>
                        Red Team
                    </div>
                    <div>Elo</div>
                    <div>Rankded</div>
                    <div>Ban</div>
                </div>
                {team2.map(participant => (
                    <div key={participant.id} className={`liveParticipant team2 ${participant.puuid === summonerMatch.puuid ? "liveSummoner" : ""}`}>



                        <div className='summoner'>

                            <div className='champ'>
                                <GetChampionImg championId={participant.championId} />
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
                            <button>
                                Runes ▼
                            </button>
                        </div>
                        <div className='ban'>
                            <GetChampionImg championId={participant.championId} />
                        </div>






                    </div>
                ))}
            </div>






        </>
    )

}


export default LiveGame