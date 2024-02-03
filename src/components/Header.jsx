import '../css/Header.css'
import React, { useState  } from 'react';

import { useNavigate  } from 'react-router-dom';
import {RegionSelect} from '../components/RegionSelect'




export function Header() {

    const [formData, setFormData] = useState({
        summonerName: '',
        region: 'euw', // Set a default region if needed
      });
    
      const navigate = useNavigate ();



      const handleFormSubmit = (event) => {
        event.preventDefault()
    

        

        const { summonerName, region } = formData;


        console.log(summonerName, region);



    
        const url = `/profile/${region}/${summonerName}`;

        
        navigate(url);
      };


      const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        // Update the form data state when form fields change
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


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
                    <form className='form'  onSubmit={handleFormSubmit}>
                    <input
                        type='text'
                        name='summonerName'
                        placeholder='Summoner name ...'
                        value={formData.summonerName}
                        onChange={handleInputChange}
                    />
                    <RegionSelect
                        name='region'
                        value={formData.region}
                        onChange={handleInputChange}
                    />
                    <button type='submit'> Search </button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header