import '../css/SummonerNavbar.css'
import { useParams } from "react-router-dom"
import { useNavigate  } from 'react-router-dom';



export function SummonerNavbar() {


    const { reg, summonerName } = useParams();
    const navigate = useNavigate ();


    const handleSummary = () => {
   
        const url = `/profile/${reg}/${summonerName}`;
       
        navigate(url);
      };

      const handleMasteryPoints = () => {

        const url = `/profile/${reg}/${summonerName}/MasteryPoints`;        
        navigate(url);
      };

      const handleLiveGame = () => {

        const url = `/profile/${reg}/${summonerName}/LiveGame`;        
        navigate(url);
      };




    return (
        <div className="summonerNavbar">
            <div className='wrapper'>
                <ul className="summonerInfoOptions">
                    <li>
                        <div onClick={handleSummary}>
                            Summary
                        </div>
                    </li>
                    <li>
                        <div onClick={handleMasteryPoints}>
                            MasteryPoints
                        </div>
                    </li>
                    <li>
                        <div onClick={handleLiveGame}>
                            Live Game
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SummonerNavbar