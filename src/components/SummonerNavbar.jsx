import '../css/SummonerNavbar.css'

export function SummonerNavbar() {
    return (
        <div className="summonerNavbar">
            <div className='wrapper'>
                <ul className="summonerInfoOptions">
                    <li>
                        <div>
                            Summary
                        </div>
                    </li>
                    <li>
                        <div>
                            MasteryPoints
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SummonerNavbar