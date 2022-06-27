import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import "./Output.css";
import mapDiapatchToProps from "../../redux/mapDiapatchToProps";
import mapStateToProps from "../../redux/mapStateToProps";
import { connect } from "react-redux";

//Komponente für die Ausgabe und das Abändern einer Ausgabe
function ExpenseItem(props) {
  const [article, setArticle] = useState(props.article);
  const [amount, setAmount] = useState(props.amount);

  const handleArticle = (event) => {
    setArticle(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  //Abgeänderte Daten abspeichern
  const changeData = () => {
    props.editExpense(props.id, {
      id: props.id,
      article: article,
      amount: Number(amount).toFixed(2),
      date: props.date,
    });
    props.setToggleEdit();
  };

  //Gewählte ID speichern und umschalten in den Bearbeitungsmodus
  const editByID = () => {
    props.setEditID(props.id);
    props.setToggleEdit();
  };

  return (
    <li>
      <div className="expense-item">
        <ExpenseDate date={props.date} />

        <div className="expense-item__description">
          {props.toggleEdit && props.id == props.editID ? (
            <>
              <input value={article} onChange={handleArticle}></input>
              <input
                defaultValue={props.element.amount}
                onChange={handleAmount}
              ></input>
              <button onClick={changeData}>OK</button>
            </>
          ) : (
            <>
              <h2>{props.article}</h2>
              <div className="expense-item__price">
                {Number(props.amount).toFixed(2).toString().replace(".", ",")} €
              </div>
              <button onClick={editByID} type="button">
                Ändern
              </button>
              <button
                type="button"
                onClick={() => {
                  props.deleteExpense(props.id);
                }}
              >
                X
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default connect(mapStateToProps, mapDiapatchToProps)(ExpenseItem);
