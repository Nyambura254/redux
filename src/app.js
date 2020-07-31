import React from "react";// import react to enable rendring
import ReactDOM from "react-dom";
import TodoApp from "./components/TodoApp";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

ReactDOM.render(<TodoApp />, document.getElementById("app"));
