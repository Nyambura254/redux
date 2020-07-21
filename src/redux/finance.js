import { createStore, combineReducers } from "redux";
import uuid from "uuid"; //this the universal-unique-id generator

// ADD_EXPENSE
// var addExpense = (payload = {}) => {
//   return {
//     type: "ADD_EXPENSE",
//     expense: {
//       id: uuid(),
//       description: payload.description ? payload.description : "",
//       note: payload.note ? payload.note : "",
//       amount: payload.amount ? payload.amount : 0,
//       createdAt: payload.createdAt ? payload.createdAt : 0,
//     },
//   };
// };

// addExpense distructuring
var addExpense = ({
    description = "", //means if no description then gives ""
    note = "",
    amount = 0,
    createdAt = 0,
} = {}) => {
    return {
        type: "ADD_EXPENSE",
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt,
        },
    };
};

// REMOVE_EXPENSE
const removeExpense = (payload = {}) => { //payload is a piece of information sent to the store..here acts like object
    return {
        type: "REMOVE_EXPENSE", //reducer has state and action....action has type to show the fuction to be performed
        id: payload.id,
    };
};

// expenses reducer
var expensesReducerDefaultState = []; //initial state is empty array
var expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.expense];
        case "REMOVE_EXPENSE":
            return state.filter((expense) => expense.id !== action.id);
        default:
            return state;
    }
};

// [].concat('joseph') --- ['joseph'] // [].concat({ description: "Electric Bills", amount: 200 })

// filters reducer
var filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
};
var filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default: return state;
    }
};

var store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);
//detects changes and logs it on console
store.subscribe(() => {
    console.log(store.getState());
});

var expenseOne = store.dispatch(
    addExpense({ description: "Electric Bills", amount: 200 })
);
var expenseTwo = store.dispatch(
    addExpense({ description: "Reducer in hooks", amount: 500 })
);

store.dispatch(removeExpense({ id: expenseOne.expense.id }));