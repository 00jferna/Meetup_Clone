import React from "react";
import {Route, Switch} from 'react-router-dom'
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <Switch>
      <LoginFormPage />
    </Switch>
  );
}

export default App;
