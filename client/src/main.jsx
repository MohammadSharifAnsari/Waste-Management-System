import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./REDUX/store.js";
import { Provider } from "react-redux";
import {Toaster} from "react-hot-toast"
import "./index.css";





ReactDOM.createRoot(document.getElementById("root")).render(
 
  

<Provider store={store}>

    <App/>
    <Toaster   position="top-center"/>

</Provider>

);


