import { Routes as Router, Route } from "react-router-dom";
import { HomePage } from '../pages/HomePage.jsx'
import { ProfilePage } from '../pages/ProfilePage.jsx'
import { SummonerMasteryPage } from '../pages/SummonerMasteryPage.jsx'
import { LiveGamePage } from '../pages/LiveGamePage.jsx'


export function Routes () {
    return (
        <Router>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:reg?/:summonerName?" element={<ProfilePage />} />
            <Route path="/profile/:reg?/:summonerName?/MasteryPoints" element={<SummonerMasteryPage />} />
            <Route path="/profile/:reg?/:summonerName?/LiveGame" element={<LiveGamePage />} />
        </Router>

    )
}

export default Routes