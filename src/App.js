import React from "react";
import { Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "./logo.svg";
import "./App.scss";
import { AmortizationCalculator } from "./components";
import { HomePage } from "./Pages";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={HomePage.component} />
      <Route exact path="/calc" component={AmortizationCalculator} />
    </div>
  );
}

export default App;
