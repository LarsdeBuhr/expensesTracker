import React from 'react';
import mapDiapatchToProps from '../../redux/mapDiapatchToProps';
import mapStateToProps from '../../redux/mapStateToProps';
import {connect} from "react-redux"
import "./Output.css"

//Filtermöglichkeit nach Monat und Jahr
function Filter(props) {

  //Das ausgewählte Jahr setzen
const handleYearChange=(event)=>{
  props.setFilteredYear(event.target.value)
}

//Den ausgewählten Monat setzen
const handleMonthChange=(event)=>{
  props.setFilteredMonth(event.target.value)
}
 
return (
  <>
  <div className='expenses-filter'>
    <div className="expenses-filter__control">
      <label>Nach Monat filtern</label>
      <select value={props.filteredMonth} onChange={handleMonthChange}>
        <option value="0">Januar</option>
        <option value="1">Februar</option>
        <option value="2">März</option>
        <option value="3">April</option>
        <option value="4">Mai</option>
        <option value="5">Juni</option>
        <option value="6">Juli</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">Oktober</option>
        <option value="10">November</option>
        <option value="11">Dezember</option>
      </select>
   
      <label>Nach Jahr filtern</label>
      <select value={props.filteredYear} onChange={handleYearChange}>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>
    </div>
    </div>
    </>
  );
}

export default connect(mapStateToProps, mapDiapatchToProps) (Filter);