

//Initialer State
const initState = {
  expenses: [],
  isEditable: false,
  filteredYear: 2022,
  filteredMonth: 4,
  toggleEdit: false,
  editID: null,
  login: { name: "admin", password: "admin" },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "EXPENSES_LOAD":
      return {
        ...state,
        expenses: action.payload,
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "TOGGLE_EDIT":
      return {
        ...state,
        toggleEdit: !state.toggleEdit,
      };

    case "EDIT_ID":
      return {
        ...state,
        editID: action.payload,
      };

    case "EDIT_EXPENSE":
      const editExpense = state.expenses.map((e) => {
        return e.id == action.payload.id ? action.payload : e;
      });
      return {
        ...state,
        expenses: editExpense,
      };
    case "DELETE_EXPENSE":
      const newArr = state.expenses.filter((value) => {
        return action.payload != value.id;
      });
      return {
        ...state,
        expenses: newArr,
      };

    case "TOGGLE_INPUT_FORM":
      return {
        ...state,
        isEditable: !state.isEditable,
      };

    case "FILTERED_YEAR":
      return {
        ...state,
        filteredYear: Number(action.payload),
      };
    case "FILTERED_MONTH":
      return {
        ...state,
        filteredMonth: Number(action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
