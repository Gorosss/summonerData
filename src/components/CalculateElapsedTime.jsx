import React, { useState } from 'react';
import moment from 'moment';
import 'moment-duration-format';



export function CalculateElapsedTime ({gameEndTimestamp})  {


    const calculateTime = (calculateTime) => {
      const currentTime = moment();
      const gameEndTime = moment(calculateTime);
      const duration = moment.duration(currentTime.diff(gameEndTime));
  
    
      if (duration.asDays().toFixed(0) == 1){
        return ' a day ago'
      }

      if (duration.asDays() > 1){
        return ` ${duration.asDays().toFixed(0)} days ago`
      }


      if (duration.asHours().toFixed(0) == 1){
        return ' an hour ago'
      }

      if (duration.asHours() > 1){
        return ` ${duration.asHours().toFixed(0)} hours ago`
      }

      if (duration.asMinutes().toFixed(0) == 1){
        return ' a minute ago'
      }

      if (duration.asMinutes() > 1){
        return ` ${duration.asMinutes().toFixed(0)} minutes ago`
      }  

    }   
  
    return (
  
     <>
        {calculateTime(gameEndTimestamp)}
     </>
    )
  }
  
  export default CalculateElapsedTime;