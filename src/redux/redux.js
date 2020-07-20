import { createStore } from "redux";


var store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1,
            };
        default:
            return state;
    }


});

console.log(store.getState());
var add = { type: "INCREMENT" }; //ACTION  ("objects in redux")
store.dispatch(add);

console.log(store.getState());