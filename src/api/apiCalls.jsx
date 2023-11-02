const API_KEY = 'RGAPI-747bf8f7-230c-4ea3-a6a1-c46ad953833d'


export const summonerNameApi = async ({ reg, summonerName }) => {


    console.log(reg, summonerName)

    try {
        const res = await fetch(`https://${reg}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
        const summoner = await res.json()

        return ({
            id: summoner.id,
            name: summoner.name,
            accountId: summoner.accountId,
            puuid: summoner.puuid,
            profileIconId: summoner.profileIconId,
            summonerLevel: summoner.summonerLevel
        })


    } catch (e) {
        throw new Error('Error searching summoner')
    }





}

export const getSummonerStats = async ({reg, summonerId }) => {
    try {
        const res = await fetch(`https://${reg}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`)
        const summonerStats = await res.json()

        return summonerStats
    } catch (e) {
        throw new Error('Error searching summoner')
    }

}

export function TierIconUrl({ tier }) {

    const tierIconUrl = `http://localhost:5173/src/img/summonerTier/${tier}.png`;
    return (
        <img src={tierIconUrl} alt="Tier Icon" height={80} width={80} />
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
