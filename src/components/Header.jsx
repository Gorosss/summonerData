import '../css/Header.css'

export function Header() {
    return (
        <header>
            <div className='nav'>
                <div className='logo'>
                    SummonerData.gg
                </div>
                <div className='searchSummoner'>
                    <form className='form' onSubmit={null}>
                        <input placeholder='Find Summoner' />
                        <button type='submit'> Search </button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header