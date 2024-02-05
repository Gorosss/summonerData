import {regionValue} from "../components/RegionValue";
import {continentValue} from "../components/RegionValue";



const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const DATADRAGONURL = import.meta.env.VITE_REACT_APP_DATADRAGON_URL;

export const summonerNameApi = async ({ reg, summonerName }) => {

    const regionString = regionValue({ region: reg });

    try {
        const res = await fetch(`https://${regionString}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
        if (res.ok) {
            const summoner = await res.json();
            return {
                id: summoner.id,
                name: summoner.name,
                accountId: summoner.accountId,
                puuid: summoner.puuid,
                profileIconId: summoner.profileIconId,
                summonerLevel: summoner.summonerLevel
            };
        } else {
            // Manejo de errores si la respuesta no es exitosa
            console.error(`Error en la solicitud de ${summonerName}: ${res.status}`);
            return null;
        }
    } catch (e) {
        // Manejo de errores generales
        console.error('Error al buscar invocador:', e);
        return null;
    }
}

export const getSummonerInfoByPuuid = async ({ reg, summonerPuuid }) => {
    const regionString = regionValue({ region: reg });
    console.log(reg, summonerPuuid);

    try {
        const res = await fetch(`https://${regionString}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${summonerPuuid}?api_key=${API_KEY}`);
        if (res.ok) {
            const summoner = await res.json();
            return {
                id: summoner.id,
                name: summoner.name,
                accountId: summoner.accountId,
                puuid: summoner.puuid,
                profileIconId: summoner.profileIconId,
                summonerLevel: summoner.summonerLevel
            };
        } else {
            // Manejo de errores si la respuesta no es exitosa
            console.error(`Error en la solicitud de ${summonerPuuid}: ${res.status}`);
            return null;
        }
    } catch (e) {
        // Manejo de errores generales
        console.error('Error al buscar invocador:', e);
        return null;
    }
}

export const getSummonerStats = async ({ reg, summonerId }) => {

    const regionString = regionValue({ region: reg });

    try {
        const res = await fetch(`https://${regionString}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`);
        if (res.ok) {
            const summonerStats = await res.json();
            return summonerStats;
        } else {
            // Manejo de errores si la respuesta no es exitosa
            console.error(`Error en la solicitud de estadísticas del invocador: ${res.status.status_code}`);
            return null;
        }
    } catch (e) {
        // Manejo de errores generales
        console.error('Error al buscar estadísticas del invocador:', e);
        return null;
    }
}

export const getSummonerSpectatorGameInfo = async ({ reg, summonerId }) => {
    const regionString = regionValue({ region: reg });

    try {
        const res = await fetch(`https://${regionString}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${API_KEY}`);
        if (res.ok) {
            const summonerStats = await res.json();
            return summonerStats;
        } else {
            // Manejo de errores si la respuesta no es exitosa
            console.error(`Error en la solicitud de estadísticas del invocador: ${res.status}`);
            return "Summoner not in game";
        }
    } catch (e) {
        // Manejo de errores generales
        console.error('Error al buscar estadísticas del invocador:', e);
        return "Summoner not in game";
    }
}

export const getSummonerChamMasteryPoints = async ({ reg, summonerId }) => {

    const regionString = regionValue({ region: reg });

    try {
        const res = await fetch(`https://${regionString}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${summonerId}?api_key=${API_KEY}`);
        if (res.ok) {
            const summonerMasteryStats = await res.json();
            return summonerMasteryStats;
        } else {
            // Manejo de errores si la respuesta no es exitosa
            console.error(`Error en la solicitud de estadísticas del invocador: ${res.status}`);
            return null;
        }
    } catch (e) {
        // Manejo de errores generales
        console.error('Error al buscar estadísticas del invocador:', e);
        return null;
    }
}

export function TierIconUrl({ tier }) {

    const tierIconUrl = `${window.location.origin}/public/img/summonerTier/${tier}.png`;
    return (
        <img src={tierIconUrl} alt="Tier Icon" height={80} width={80} />
    )

}

export function TierMiniIconUrl({ tier }) {

    const tierIconUrl = `${window.location.origin}/public/img/miniTierIcons/${tier}.png`;
    return (
        <img src={tierIconUrl} alt="Tier Icon" height={16} width={16} />
    )

}

export const getLastMatches = async ({ summonerPuuid, numMatches , reg}) => {

    const continentString = continentValue({ region: reg });
    console.log(continentString,reg)

    try {
        const res = await fetch(`https://${continentString}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=${numMatches-10}&count=${numMatches}&api_key=${API_KEY}`)
        const lastMatchesIdList = await res.json()
        const lastMatchesList = []

        for (const matchId of lastMatchesIdList) {
            const resMatch = await fetch(`https://${continentString}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`)
            const matchInfo = await resMatch.json()
            lastMatchesList.push(matchInfo)
          }
          return lastMatchesList
    } catch (e) {
        throw new Error('Error searching summoner')
    }

    
}


export function ProfileIconUrl({ profileIconId }) {

    const profileIconUrl = `${DATADRAGONURL}img/profileicon/${profileIconId}.png`;
    return (
        <img src={profileIconUrl} alt="Profile Icon" height={100} width={100} />
    )

}

export function ChampIconUrl({ champIconName }) {

    const champIconUrl = `${DATADRAGONURL}img/champion/${champIconName}.png`;
    return (
        <img src={champIconUrl} alt="Champ Icon" height={25} width={25} />
    )

}


export function ItemsIconsUrl({ itemIconId , item}) {
    if (itemIconId === 0){
        return (
            <div className={'noItem'} style={{ height: 24 , width: 24}}>
            </div>
            
        )
    }

    const itemIconUrl = `${DATADRAGONURL}img/item/${itemIconId}.png`;
    return (
        <div className={item}>
            <img src={itemIconUrl} alt="Item Icon" height={24} width={24} />
        </div>
        
    )

}

export function SummonerSpellIconUrl({ summonerSpeelIconId }) {



    const champIconUrl = `${window.location.origin}/public/img/summonerSpell/${summonerSpeelIconId}.png`;
    return (
        <div>
            <img src={champIconUrl} alt="Champ Icon" height={20} width={20} />

        </div>
    )

}

export function RuneIconUrl({ runeIconId }) {



    const champIconUrl = `${window.location.origin}/public/img/rune/${runeIconId}.png`;
    return (
        <>
            <img src={champIconUrl} alt="Champ Icon" height={20} width={20} />

        </>
    )

}
