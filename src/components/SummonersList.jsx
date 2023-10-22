import React from "react";

import { ChampIconUrl } from '../api/apiCalls.jsx'

import {Top, Jungle, Mid, Bot, Sup} from '../assets/svgs.jsx'




export function SummonersList({ matchParticipants }) {



    return (
        <>
            {
                matchParticipants.map((participant) => {
                    return (
                        <div className={`summ${participant.teamId}${participant.teamPosition}`}>
                            {participant.teamId === 100 ? (
                                <>  
                                       <p className="teamId100">{participant.summonerName}</p> 
                                    
                                    <ChampIconUrl champIconName={participant.championName} />
                                </>
                            ) : (
                                <>
                                    <ChampIconUrl champIconName={participant.championName} />
                                    <p className="teamId200">{participant.summonerName}</p> 
                                </>
                            )}
                        </div>
                    )
                })


            }
            <div className="topIcon">
                <Top/>
            </div>
            <div className="jungleIcon">
                <Jungle/>
            </div>
            <div className="midIcon">
                <Mid/>
            </div>
            <div className="botIcon">
                <Bot/>
            </div>
            <div className="supIcon">
                <Sup/>
            </div>
        </>
    )
}

export default SummonersList