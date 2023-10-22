import { getSummonerStats, TierIconUrl } from '../api/apiCalls.jsx'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/RankedsProfileStats.css';


import {ProgressBarWinRate} from '../components/ProgressBar.jsx';




export function RankedsProfileStats({ reg, summonerId }) {
    const [summonerSolo, setSummonerSolo] = useState(); // Initialize the state with null or an initial value
    const [summonerFlex, setSummonerFlex] = useState(); // Initialize the state with null or an initial value

    const getSummonerStatsFun = async () => {
        try {
            const summonerStats = await getSummonerStats({ reg, summonerId });
            console.log(summonerStats)
            setSummonerSolo(summonerStats.find(queue => (queue.queueType === "RANKED_SOLO_5x5")));
            setSummonerFlex(summonerStats.find(queue => (queue.queueType === "RANKED_FLEX_SR")));
        } catch (e) {
            // Handle errors here
        } finally {
            // You should set the loading state here if you have a 'setLoading' function
        }
    };

    // Call the function to fetch the summoner info
    useEffect(() => {
        getSummonerStatsFun();
    }, []);


    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const romanToArabicMap = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4
    };

    console.log(summonerFlex)

    return (
        <>
            {
                summonerSolo === undefined ? <></> : (
                    <div className='row soloQueue'>
                        <div className='col'>
                            <TierIconUrl tier={summonerSolo.tier} />
                        </div>
                        <div className='col'>
                            <div className='row'>
                                {capitalizeFirstLetter(summonerSolo.tier)} 
                                {romanToArabicMap[summonerSolo.rank]}
                                LP {summonerSolo.leaguePoints}
                            </div>
                            <div className='row'>
                                {summonerSolo.wins}W 
                                {summonerSolo.losses}L 
                                {((summonerSolo.wins/(summonerSolo.wins+summonerSolo.losses))*100).toFixed(1)}%
                            </div>
                            <div className='row'>
                                <ProgressBarWinRate win={((summonerSolo.wins/(summonerSolo.wins+summonerSolo.losses))*100).toFixed(1)} losse={100-((summonerSolo.wins/(summonerSolo.wins+summonerSolo.losses))*100).toFixed(1)}/>
                            </div>
                        </div>
                    </div>
                )


            }

            {
                summonerFlex === undefined ? <></> : (
                    <div className='row flexQueue'>
                        <div className='col'>
                            <TierIconUrl tier={summonerFlex.tier} />
                        </div>
                        <div className='col'>
                            <div className='row'>
                                {capitalizeFirstLetter(summonerFlex.tier)} 
                                {romanToArabicMap[summonerFlex.rank]}
                                LP {summonerFlex.leaguePoints}
                            </div>
                            <div className='row'>
                                {summonerFlex.wins}W 
                                {summonerFlex.losses}L 
                                {((summonerFlex.wins/(summonerFlex.wins+summonerFlex.losses))*100).toFixed(1)}%
                            </div>
                            <div className='row'>
                                <ProgressBarWinRate win={((summonerFlex.wins/(summonerFlex.wins+summonerFlex.losses))*100).toFixed(1)} losse={100-((summonerFlex.wins/(summonerFlex.wins+summonerFlex.losses))*100).toFixed(1)}/>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}


export default RankedsProfileStats