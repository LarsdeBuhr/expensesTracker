import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import mapDiapatchToProps from "../../redux/mapDiapatchToProps";
import mapStateToProps from "../../redux/mapStateToProps";
import InputForm from "./InputForm";
import "./Input.css";

//Form mit Inputfeldern via LogIn auf- oder zuklappen
function NewInput(props) {

  //State, in welchem hinterlegt ist ob das Passwort korrekt ist und ob etwas angezeigt wird
  const [correctPassword, setCorrectPassword] = useState(true);
  const [disabled, setDisabled] = useState(false);

  //State der LogIn Daten. Also für Name und Passwort. Initial auf einen leeren String gesetzt.
  const [loginValues, setLoginValues] = useState({
    name: "",
    password: "",
  });

  //LoginDaten aus den Inputfeldern setzen
  const inputHandler = (event) => {
    setLoginValues((currentState) => {
      return {
        ...currentState,
        [event.target.name]: event.target.value,
      };
    });
  };

  //Durch das leere Dependency Array wird nur beim ersten Durchlaufen des Quellcodes wird im LocalStorage gecheckt, ob der User bereits eingeloggt ist. Wenn ja wird die Anmeldemaske nichtmehr gezeigt.
  //Dazu wird die toggleInputForm Funktion gerufen welche die Anmeldemaske ein- oder ausschalten kann
  useEffect(() => {
    if (localStorage.getItem("login") == "true" && props.isEditable == false) {
      props.toggleInputForm();
    }
  }, []);

  

  //Eingabedaten für den Login prüfen und bei Übereinstimmung das Programm anzeigen
  //Zudem wird im Local Storage hinterlegt, dass der Login erfolgreich war indem der Wert auf true gesetzt wird
  //Nach erfolgreichem LogIn werden die Werter in den Inputfeldern wieder geleert
  //Sofern der Login falsch war wird der Button für 5 Sekunden deaktiviert um Brute Force Attacken abzuwehren
  const checkLogIn = () => {
    if (
      props.login.name == loginValues.name &&
      props.login.password == loginValues.password
    ) {
      props.toggleInputForm();
      localStorage.setItem("login", "true");
      setCorrectPassword(true);
      setLoginValues({
        name: "",
        password: "",
      });
    } else {
      setCorrectPassword(false);
      setDisabled(true);
      setTimeout(setDisabled, 5000, false);
    }
  };

  return (
    <div className="new-expense new-expense__control new-expense__controls">
    {/* Es wird anhängig von der Variable isEditable der LogIn Bereich oder die InputForm Komponente angezeigt */}
      {!props.isEditable ?  
      (
        <>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={loginValues.name}
            onChange={inputHandler}
          ></input>
          <input
            type="password"
            placeholder="Passwort"
            name="password"
            value={loginValues.password}
            onChange={inputHandler}
          ></input>

          <button type="button" onClick={checkLogIn} disabled={disabled}>
            Anmelden
          </button>
          {!correctPassword && disabled && (
            <>
              <p>Anmeldung fehlgeschlagen.</p>
              <p>LogIn aus Sicherheitsgründen 5 Sekunden lang gesperrt!</p>
            </>
          )}
        </>
      ) : 
      (
        <InputForm />
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDiapatchToProps)(NewInput);
