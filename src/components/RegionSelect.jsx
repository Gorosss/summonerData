import React from 'react';

export function RegionSelect({name, value, onChange}) {

  return (
    <select name={name} value={value} onChange={onChange}>
        <option value="euw">EUW</option>
        <option value="br">BR</option>
        <option value="eun">EUN</option>
        <option value="jp">JP</option>
        <option value="kr">KR</option>
        <option value="lan">LAN</option>
        <option value="las">LAS</option>
        <option value="na">NA</option>
        <option value="oc">OC</option>
        <option value="ru">RU</option>
        <option value="tr">TR</option>
    </select>
  );
  
}

export default RegionSelect;

