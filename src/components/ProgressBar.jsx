import React from 'react';

import '../css/ProgressBar.css'

export const ProgressBarDMG = ({ dmg, maxDmg }) => {
  const progress = (dmg / maxDmg) * 100; 
  return (
    <div className="progress-bar">
      <div className="progress DMG" style={{ width: `${progress}%` }}></div>
    </div>
  );
};


export const ProgressBarMastery = ({ pointsEarned, pointsToNextLevel }) => {

  const progress = (pointsEarned / (pointsEarned + pointsToNextLevel)) * 100;
  const remainingProgress = 100 - progress;

  return (
    <div className="progress-container">
      <div className="progress masteryPoints" style={{ width: `${progress}%` }}>
        
      </div>
      <div className="progress masteryPoints remaining" style={{ width: `${remainingProgress}%` }}>
        
      </div>
    </div>
  );
};



export const ProgressBarWinRate = ({ win }) => {
  const progress1 = win 
  const progress2 = 100-win
  return (
    <div className="progress-bar">
      <div className="progress" style={{
        background: `linear-gradient(to right, #3273fa ${progress1}%, #ff4655 ${progress1}% ${progress2}%)`
      }}></div>
    </div>
  );
};


