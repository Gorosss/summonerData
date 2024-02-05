import React from "react";

import { ChampIconUrl } from '../api/apiCalls.jsx'

import { Top, Jungle, Mid, Bot, Sup } from '../../public/assets/svgs.jsx'




export function SummonersList({ matchParticipants , region}) {



    return (
        <>
            {
                matchParticipants.map((participant) => {
                    return (
                        <div className={`summ${participant.teamId}${participant.teamPosition}`}>
                            {participant.teamId === 100 ? (
                                <>
                                    <a className="teamId100" href={`${window.location.origin}/profile/`+region+"/" + participant.summonerName} target="_blank" rel="noopener noreferrer">
                                        {participant.summonerName}
                                    </a>
                                    <ChampIconUrl champIconName={participant.championName} />
                                </>
                            ) : (
                                <>
                                    <ChampIconUrl champIconName={participant.championName} />
                                    <a className="teamId200" href={`${window.location.origin}/profile/`+region+"/" + participant.summonerName} target="_blank" rel="noopener noreferrer">
                                        {participant.summonerName}
                                    </a>
                                </>
                            )}
                        </div>
                    )
                })


            }
            <div className="topIcon">
                <Top />
            </div>
            <div className="jungleIcon">
                <Jungle />
            </div>
            <div className="midIcon">
                <Mid />
            </div>
            <div className="botIcon">
                <Bot />
            </div>
            <div className="supIcon">
                <Sup />
            </div>
        </>
    )
}

export function SummonersListSpecial({ matchParticipants , region}) {



    return (
        <>
            {
                matchParticipants.map((participant, index) => {
                    return (
                        <div className={`summ${participant.teamId}${index}`}>
                            {participant.teamId === 100 ? (
                                <>

                                    <a className="teamId100" href={`${window.location.origin}/profile/`+region+"/" + participant.summonerName} target="_blank" rel="noopener noreferrer">
                                        {participant.summonerName}
                                    </a>

                                    <ChampIconUrl champIconName={participant.championName} />
                                </>
                            ) : (
                                <>
                                    <ChampIconUrl champIconName={participant.championName} />

                                    <a className="teamId200" href={`${window.location.origin}/profile/`+region+"/" + participant.summonerName} target="_blank" rel="noopener noreferrer">
                                        {participant.summonerName}
                                    </a>
                                </>
                            )}
                        </div>
                    )
                })


            }
            <div className="vsIcon">
                VS
            </div>
        </>
    )
}

export default SummonersList