import { Routes as Router, Route } from "react-router-dom";
import { HomePage } from '../pages/HomePage.jsx'
import { ProfilePage } from '../pages/ProfilePage.jsx'


export function Routes () {
    return (
        <Router>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:reg?/:summonerName?" element={<ProfilePage />} />
        </Router>

    )
}

export default Routes