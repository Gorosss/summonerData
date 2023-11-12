import {RegionSelect} from '../components/RegionSelect'
import React, { useState  } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Header } from '../components/Header.jsx'




export function HomePage() {

    const [formData, setFormData] = useState({
        summonerName: '',
        region: 'EUW1', // Set a default region if needed
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
   

    return (
        <div className='page'>

            <Header />
            <main>
                <div className='search'>
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

            </main>
        </div>
    )
}

export default HomePage