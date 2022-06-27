import { useEffect } from "react";
import "./App.css";
import NewInput from "./components/input/NewInput";
import OutputArea from "./components/output/OutputArea";
import mapDiapatchToProps from "./redux/mapDiapatchToProps";
import mapStateToProps from "./redux/mapStateToProps";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Nav from "./nav/Nav";

function App(props) {

  //Initiales Laden der Daten aus der JSON Datei
  useEffect(() => {
    props.expensesLoad();
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<NewInput />} />
        <Route path="/auswertung" element={<OutputArea />} />
      </Routes>
    </div>
  );
}

export default connect(mapStateToProps, mapDiapatchToProps)(App);
