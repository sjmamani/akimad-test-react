import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import userReducer from "./redux/reducers/userReducers";
import userDetailsReducer from "./redux/reducers/userDetailsReducers";
import userRepositoriesReducer from "./redux/reducers/userRepositoriesReducers";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const mainReducer = combineReducers({
  users: userReducer,
  userDetails: userDetailsReducer,
  userRepositories: userRepositoriesReducer,
});
const store = createStore(mainReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
