import React from 'react';
import "./Output.css"

//Komponente zum Ermitteln der Füllhöhe der Balken im angezeigten Chart
function ChartBar(props) {
  //Füllhöhe der Balekn mit 0% initalisieren
  let barFillHeight = '0%';

  //Den Monatswert ins Verhältnis zum Maximalwert setzen
  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
  }

  return (
    <div className='chart-bar'>
      <div className='chart-bar__inner'>
        <div
          className='chart-bar__fill'
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className='chart-bar__label'>{props.label}</div>
    </div>
  );
}

export default ChartBar;








