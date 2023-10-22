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


export const ProgressBarWinRate = ({ win, losse }) => {
  const progress1 = win 
  const progress2 = losse
  return (
    <div className="progress-bar">
      <div className="progress" style={{
        background: `linear-gradient(to right, green ${progress1}%, red ${progress1}% ${progress2}%)`
      }}></div>
    </div>
  );
};


