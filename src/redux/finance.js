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
    switch (action.type) { //action must have a type to show what to be performed
        case "ADD_EXPENSE":
            return [...state, action.expense];
        case "REMOVE_EXPENSE":
            return state.filter((expense) => expense.id !== action.id); //filter expense by id,if no action.id
        default:
            return state; //default value-initial state
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


//in redux we must have only and only one store where we can reference our value by either calling them or by querry
var store = createStore(
    combineReducers({ //we use combineReducer for all our reducer
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);
//detects changes and logs it on console
store.subscribe(() => {
    console.log(store.getState()); //current store
});

var expenseOne = store.dispatch(
    addExpense({ description: "Electric Bills", amount: 200 })
);
var expenseTwo = store.dispatch(
    addExpense({ description: "Hot Coffee", amount: 500 })
);

store.dispatch(removeExpense({ id: expenseOne.expense.id })); //when we want to remove...we can target by id what we have already in our store