import React from 'react';
import { NavLink } from 'react-router-dom'
import "./Nav.css"
import { connect } from "react-redux";
import mapDiapatchToProps from '../redux/mapDiapatchToProps';
import mapStateToProps from "../redux/mapStateToProps";

//Navigations-Komponente
function Nav(props) {

  return (
    
    localStorage.getItem("login") == "true" && 
      <nav className='nav'>
          <NavLink to="/">Eingabe</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/auswertung">Auswertung</NavLink>
        
      </nav>
      
  );
}



export default connect(mapStateToProps, mapDiapatchToProps) (Nav);