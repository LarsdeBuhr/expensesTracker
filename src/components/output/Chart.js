import React from "react";
import mapDiapatchToProps from "../../redux/mapDiapatchToProps";
import mapStateToProps from "../../redux/mapStateToProps";
import { connect } from "react-redux";
import "./Output.css";
import ChartBar from "./ChartBar";


function Chart(props) {
//Das Jahr der Datensätze mit dem ausgewählten Jahr des Dropdown Menüs vergleichen und in einem neuen Array abspeichern
  const newArr = props.expenses.filter((e) => {
    return (
      new Date(e.date).getFullYear().toString() ===
      props.filteredYear.toString()
    );
  });

//Array für die Anzeige aller Monate in den Details
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mär", value: 0 },
    { label: "Apr", value: 0 },
    { label: "Mai", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Okt", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dez", value: 0 },
  ];

//Jedem Monat den Gesamtbetrag zuweisen
  for (const expense of newArr) {
    const expenseMonth = new Date(expense.date).getMonth();
    chartDataPoints[expenseMonth].value += Number(expense.amount);
  }

  //Ein Array erzeugen mit allen Gesamtwerten aller Monate des Jahres erzeugen
  const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
  //Den Maximalbetrag eines Monats für das Jahr ermitteln
  const totalMaximum = Math.max(...dataPointValues);



  return (
    <div className="chart">
      {chartDataPoints.map((dataPoint) => (
        
     <ChartBar 
      key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
          
     />
      ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDiapatchToProps)(Chart);
