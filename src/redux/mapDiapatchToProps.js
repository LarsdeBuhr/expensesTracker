import React from "react";
import axios from "axios";
import { BASE_URL } from "../assets/baseURL";

function mapDiapatchToProps(dispatch) {
  return {
    //Alle Ausagben abrufen
    expensesLoad: () => {
      dispatch(() => {
        axios.get(`${BASE_URL}/expenses`).then((response) => {
          dispatch({
            type: "EXPENSES_LOAD",
            payload: response.data,
          });
        });
      });
    },

    //Eine Ausgabe dem Datensatz hinzufügen
    addExpense: (expense) => {
      dispatch(() => {
        axios.post(`${BASE_URL}/expenses`, expense).then((response) => {
          dispatch({
            type: "ADD_EXPENSE",
            payload: response.data,
          });
        });
      });
    },

    //Editieren an- und ausschalten
    setToggleEdit: () => {
      dispatch({
        type: "TOGGLE_EDIT",
      });
    },

    //ID für den Datensatz setzen, der bearbeitet wird
    setEditID: (id) => {
      dispatch({
        type: "EDIT_ID",
        payload: id,
      });
    },

    //Die Werte eines ausgewählten Datensatzes bearbeiten
    editExpense: (id, element) => {
      dispatch(() => {
        axios.put(`${BASE_URL}/expenses/${id}`, element).then((response) => {
          dispatch({
            type: "EDIT_EXPENSE",
            payload: response.data,
          });
        });
      });
    },

//Einen ausgewählten Datensatz löschen
    deleteExpense: (id) => {
      dispatch(() => {
        axios.delete(`${BASE_URL}/expenses/${id}`).then((response) => {
          dispatch({
            type: "DELETE_EXPENSE",
            payload: id,
          });
        });
      });
    },

    //Ein- und Ausschalten der InputForm
    toggleInputForm: () => {
      dispatch({
        type: "TOGGLE_INPUT_FORM",
      });
    },

    //Das ausgewählte Jahr setzen
    setFilteredYear: (year) => {
      dispatch({
        type: "FILTERED_YEAR",
        payload: year,
      });
    },

    //Den ausgewählten Monat setzen
    setFilteredMonth: (month) => {
      dispatch({
        type: "FILTERED_MONTH",
        payload: month,
      });
    },
  };
}

export default mapDiapatchToProps;
