import { ProfileIconUrl } from '../api/apiCalls.jsx'
import '../css/HeadProfile.css'
import 'bootstrap/dist/css/bootstrap.css';



export function HeadProfile({ profileIconId, summonerName }) {
    return (
      <div className="row headProfile">
        <div className='profileIcon'>
          <ProfileIconUrl profileIconId={profileIconId} />
        </div>
        <div className='profileInfo'>
          <div className='summonerName'>
            {summonerName}
          </div>
        </div>
  
      </div>
  
    )
  }

  export default HeadProfile