import '../css/Header.css'
import React from 'react';


export function Header() {


    const handleHome = () => {

        window.location.href = 'http://localhost:5173';
      };


    return (
        <header>
            <div className='nav'>
                <div onClick={handleHome} className='logo'>
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