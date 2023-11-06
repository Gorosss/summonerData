const API_KEY = 'RGAPI-747bf8f7-230c-4ea3-a6a1-c46ad953833d'


export const summonerNameApi = async ({ reg, summonerName }) => {
    console.log(reg, summonerName);

    try {
        const res = await fetch(`https://${reg}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
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
    console.log(reg, summonerPuuid);

    try {
        const res = await fetch(`https://${reg}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${summonerPuuid}?api_key=${API_KEY}`);
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


    try {
        const res = await fetch(`https://${reg}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`);
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
    try {
        const res = await fetch(`https://${reg}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${API_KEY}`);
        if (res.ok) {
            const summonerStats = await res.json();
            return summonerStats;
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

export const getSummonerChamMasteryPoints = async ({ reg, summonerId }) => {
    try {
        const res = await fetch(`https://${reg}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${summonerId}?api_key=${API_KEY}`);
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

    const tierIconUrl = `http://localhost:5173/src/img/summonerTier/${tier}.png`;
    return (
        <img src={tierIconUrl} alt="Tier Icon" height={80} width={80} />
    )

}

export function TierMiniIconUrl({ tier }) {

    const tierIconUrl = `http://localhost:5173/src/img/miniTierIcons/${tier}.png`;
    return (
        <img src={tierIconUrl} alt="Tier Icon" height={16} width={16} />
    )

}

export const getLastMatches = async ({ summonerPuuid }) => {
    try {
        const res = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=20&api_key=${API_KEY}`)
        const lastMatchesIdList = await res.json()
        const lastMatchesList = []

        for (const matchId of lastMatchesIdList) {
            const resMatch = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`)
            const matchInfo = await resMatch.json()
            lastMatchesList.push(matchInfo)
          }
          return lastMatchesList
    } catch (e) {
        throw new Error('Error searching summoner')
    }

    
}


export function ProfileIconUrl({ profileIconId }) {

    const profileIconUrl = `http://ddragon.leagueoflegends.com/cdn/13.19.1/img/profileicon/${profileIconId}.png`;
    return (
        <img src={profileIconUrl} alt="Profile Icon" height={100} width={100} />
    )

}

export function ChampIconUrl({ champIconName }) {

    const champIconUrl = `http://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${champIconName}.png`;
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

    const itemIconUrl = `http://ddragon.leagueoflegends.com/cdn/13.20.1/img/item/${itemIconId}.png`;
    return (
        <div className={item}>
            <img src={itemIconUrl} alt="Item Icon" height={24} width={24} />
        </div>
        
    )

}

export function SummonerSpellIconUrl({ summonerSpeelIconId }) {



    const champIconUrl = `http://localhost:5173/src/img/summonerSpell/${summonerSpeelIconId}.png`;
    return (
        <div>
            <img src={champIconUrl} alt="Champ Icon" height={20} width={20} />

        </div>
    )

}

export function RuneIconUrl({ runeIconId }) {



    const champIconUrl = `http://localhost:5173/src/img/rune/${runeIconId}.png`;
    return (
        <>
            <img src={champIconUrl} alt="Champ Icon" height={20} width={20} />

        </>
    )

}
