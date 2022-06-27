import React, { useState } from "react";
import mapDiapatchToProps from "../../redux/mapDiapatchToProps";
import mapStateToProps from "../../redux/mapStateToProps";
import { connect } from "react-redux";
import "./Input.css";

// Komponente zum Erfassen der Eingabewerte für Artikel, Betrag und Datum
function InputForm(props) {

  //State für Artikel, Betrag und Datum
  const [expenses, setExpenses] = useState({article: "", amount: "", date: ""})

  //Hinzufügen von einem neuen Eintrag in die JSON Datei und anschließendes Leeren der Eingabefelder
  const handleInput = () => {
    props.addExpense({
      article: expenses.article,
      amount: Number(expenses.amount).toFixed(2),
      date: expenses.date,
    });
    setExpenses({ article: "", amount: "", date: "" });
  };

  //Aktualisieren der jeweiligen Werte der Inputfelder für eine Ausgabe
 const inputHandler = event =>{
   setExpenses((current)=>{
     return{
       ...current,
       [event.target.name] : event.target.value
     }
   })
 }

 //Durch Betätigen des Abmelden Buttons wird dem User wieder die LogIn Maske angezeigt. Zudem wird der localStorage auf false gesetzt.
  const logout = () =>{
    props.toggleInputForm()
    localStorage.setItem("login", "false")
  }

  return (
    <form>
      <h2>Eingabe</h2>
      <div className="new-expense__controls">
        {/* Artikel Input */}
        <div className="new-expense__control">
          <label>Artikel</label>
          <input
            type="text"
            value={expenses.article}
            name="article"
            onChange={inputHandler}
          ></input>
        </div>
        {/* Betrag Input */}
        <div className="new-expense__control">
          <label>Betrag</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={expenses.amount}
            name="amount"
            onChange={inputHandler}
          ></input>
        </div>
        {/* Datum Input */}
        <div className="new-expense__control">
          <label>Datum</label>
          <input
            type="date"
            min="2020-01-01"
            max="2023-12-31"
            value={expenses.date}
            name="date"
            onChange={inputHandler}
          ></input>
        </div>
      </div>
      <div className="new-expense__actions">
      {/* Formular Input Werte zurücksetzen */}
        <button
          type="button"
          onClick={() => {
            setExpenses({ article: "", amount: "", date: "" });
          }}
        >
          Zurücksetzen
        </button>
        {/* Button zum Hinzufügen eines neuen Datensatzes sofern alle Inputfelder gefüllt sind */}
        <button
          type="button"
          disabled={
            !expenses.article ||
            !expenses.amount ||
            !expenses.date
          }
          onClick={handleInput}
        >
          Hinzufügen
        </button>
        {/* Form schließen */}
        <button type="button" onClick={logout}>
          Abmelden
        </button>
      </div>
    </form>
  );
}

export default connect(mapStateToProps, mapDiapatchToProps)(InputForm);
