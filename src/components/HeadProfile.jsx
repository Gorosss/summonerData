import { ProfileIconUrl } from '../api/apiCalls.jsx'
import '../css/HeadProfile.css'
import 'bootstrap/dist/css/bootstrap.css';



export function HeadProfile({ summonerInfo }) {
  console.log(summonerInfo)
    return (
      <div>
        <div className='profileIcon'>
          <ProfileIconUrl profileIconId={summonerInfo.profileIconId} />
          <div className='summonerLevel'>
            {summonerInfo.summonerLevel}

          </div>
        </div>
        <div className='profileInfo'>
          <div className='summonerName'>
            {summonerInfo.name}
          </div>
        </div>
  
      </div>
  
    )
  }

  export default HeadProfile
  