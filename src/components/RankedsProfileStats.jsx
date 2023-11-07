import { getSummonerStats, TierIconUrl } from '../api/apiCalls.jsx'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/RankedsProfileStats.css';


import { ProgressBarWinRate } from '../components/ProgressBar.jsx';




export function RankedsProfileStats({ reg, summonerId }) {
    const [summonerSolo, setSummonerSolo] = useState(); // Initialize the state with null or an initial value
    const [summonerFlex, setSummonerFlex] = useState(); // Initialize the state with null or an initial value
    const [winratePercentColorSolo, setWinratePercentColorSolo] = useState('#ffffff'); // Initialize the state with null or an initial value
    const [winratePercentColorFlex, setWinratePercentColorFlex] = useState('#ffffff'); // Initialize the state with null or an initial value
    const [winratePercentSolo, setWinratePercentSolo] = useState(); // Initialize the state with null or an initial value
    const [winratePercentFlex, setWinratePercentFlex] = useState(); // Initialize the state with null or an initial value
    const [loading, setLoading] = useState(true);

    const getSummonerStatsFun = async () => {
        try {
            const summonerStats = await getSummonerStats({ reg, summonerId });

            const summonerSoloTemp = await summonerStats.find(queue => (queue.queueType === "RANKED_SOLO_5x5"))
            const summonerFlexTemp = await summonerStats.find(queue => (queue.queueType === "RANKED_FLEX_SR"))
            
            setSummonerSolo(summonerSoloTemp);
            setSummonerFlex(summonerFlexTemp);
            setWinratePercentSolo(((summonerSoloTemp.wins / (summonerSoloTemp.wins + summonerSoloTemp.losses)) * 100).toFixed(1))
            setWinRateColorSolo()
            setWinratePercentFlex(((summonerFlexTemp.wins / (summonerFlexTemp.wins + summonerFlexTemp.losses)) * 100).toFixed(1))
            setWinRateColorFlex()
            setLoading(false)

        } catch (e) {
            console.log("error ", e)
        } finally {
            // You should set the loading state here if you have a 'setLoading' function
        }
    };

    // Call the function to fetch the summoner info
    useEffect(() => {
        getSummonerStatsFun();
    }, []);


    useEffect(() => {
        setWinRateColorSolo();
    }, [winratePercentSolo]);

    useEffect(() => {
        setWinRateColorFlex();
    }, [winratePercentFlex])


    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const romanToArabicMap = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4
    }
    const setWinRateColorSolo = () => {

        if (winratePercentSolo < 40) {
            setWinratePercentColorSolo('#ff4655')
        }

        if (winratePercentSolo > 60) {
            setWinratePercentColorSolo('#3273fa')
        }

    }
    const setWinRateColorFlex = () => {
        if (winratePercentFlex < 40) {
            setWinratePercentColorFlex('#ff4655')
        }

        if (winratePercentFlex > 60) {
            setWinratePercentColorFlex('#3273fa')
        }

    }

    console.log(winratePercentSolo,winratePercentColorSolo)

    return (
        <>
            {
                 loading ? <></> : (
                    <div className='soloQueue'>
                        <div className='tierIcon'>
                            <TierIconUrl tier={summonerSolo.tier} />
                        </div>
                        <div className='rankSummary'>
                            <div className='rankType'>Ranked Solo</div>
                            <div className='rankInfo'>
                                <span className='rank'>{capitalizeFirstLetter(summonerSolo.tier)} {romanToArabicMap[summonerSolo.rank]}</span>
                                <span className='dot'>·</span>
                                <span className='lpPoints'>{summonerSolo.leaguePoints} LP</span> 
                            </div>
                            <div className='rankWinrate'>
                                <span className='gamesWinLoss'>{summonerSolo.wins}</span>
                                <span>W</span>
                                <span className='gamesWinLoss'>{summonerSolo.losses}</span>
                                <span>L</span>
                                <span className='dot'>·</span>
                                <span className='winratePercent'  style={{color : winratePercentColorSolo}}>{winratePercentSolo}%</span>
                                
                                
                            </div>
                            <div className='progressWinRate'>
                                <ProgressBarWinRate win={winratePercentSolo} />
                            </div>
                        </div>
                    </div>
                )


            }

            {
                summonerFlex === undefined ? <></> : (
                    <div className='flexQueue'>
                        <div className='tierIcon'>
                            <TierIconUrl tier={summonerFlex.tier} />
                        </div>
                        <div className='rankSummary'>
                            <div className='rankType'>Ranked Flex</div>
                            <div className='rankInfo'>
                                <span className='rank'>{capitalizeFirstLetter(summonerFlex.tier)} {romanToArabicMap[summonerFlex.rank]}</span>
                                <span className='dot'>·</span>
                                <span className='lpPoints'>{summonerFlex.leaguePoints} LP</span> 
                            </div>
                            <div className='rankWinrate'>
                                <span className='gamesWinLoss'>{summonerFlex.wins}</span>
                                <span>W</span>
                                <span className='gamesWinLoss'>{summonerFlex.losses}</span>
                                <span>L</span>
                                <span className='dot'>·</span>
                                <span className='winratePercent'  style={{color : winratePercentColorFlex}}>{winratePercentFlex}%</span>
                                
                                
                            </div>
                            <div className='progressWinRate'>
                                <ProgressBarWinRate win={winratePercentFlex} />
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}


export default RankedsProfileStats