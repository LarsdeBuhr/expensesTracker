import mapDiapatchToProps from "../../redux/mapDiapatchToProps";
import mapStateToProps from "../../redux/mapStateToProps";
import { connect } from "react-redux";
import Filter from "./Filter";
import ExpenseItem from "./ExpenseItem";
import Chart from "./Chart";
import "./Output.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";

//Bereich in dem alle Ausgaben des Programms angezeigt werden
function OutputArea(props) {

  const navigate = useNavigate();

  //Wenn der User nicht angemeldet ist, dann wird er auf die Anmeldeseite weitergeleitet und bekommt keine Einsicht in die Auswertungen
  useEffect(()=>{
    if(!(localStorage.getItem("login") == "true")){
      navigate("/")
    }
  },[])

  //Ein Array erzeugen welches die Ausgaben für den ausgewählten Monat im ausgewählten Jahr enthält
  const newArr = props.expenses
    .filter((e) => {
      return (
        new Date(e.date).getFullYear().toString() ===
        props.filteredYear.toString()
      );
    })
    .filter((e) => {
      return new Date(e.date).getMonth() === props.filteredMonth;
    });

  //Ausgaben eines Monats nach Datum sortieren
  let sortetNewArr;
  if (newArr.length > 0) {
    sortetNewArr = newArr.sort(function (a, b) {
      return new Date(a.date).getDate() - new Date(b.date).getDate();
    });
  }

  //Summe der Monatsausgaben ermitteln
  const sumAmount = () => {
    let sum = 0;
    newArr.forEach((element) => {
      sum = sum + Number(element.amount);
    });
    return sum;
  };




  return (
    <>
    {/* Nur anzeigen wenn der User auch eingeloggt ist */}
      {localStorage.getItem("login") == "true" && (
        <div className="expenses">
          <Filter />
          <Chart />
          {/* Ausgaben nur anzeigen, sofern die Länge des Arrays für den Monat und das Jahr Werte enthält. Sofern keine Werte vorhanden sind wird ein Alternativtext angezeigt. */}
          {newArr.length > 0 ? (
            <>
              <h3 className="expenses-sum">
                Gesamtausgaben des Monats:{" "}
                {sumAmount().toFixed(2).toString().replace(".", ",")} €
              </h3>
              <ul className="expenses-list">
                {sortetNewArr.map((e) => {
                  return (
                    <ExpenseItem
                      key={e.id}
                      article={e.article}
                      amount={e.amount}
                      date={new Date(e.date)}
                      id={e.id}
                      element={e}
                    />
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="expenses-sum">
              Es gibt keine Einträge für diesen Monat
            </p>
          )}
        </div>
      )}
      
    </>
  );
}

export default connect(mapStateToProps, mapDiapatchToProps)(OutputArea);
