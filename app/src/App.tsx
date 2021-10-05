import React, { useContext, useState } from "react";
import "./app.css";
import ErrorModal from "./components/ErrorModal";
import LoginSub from "./components/LoginSub";
import { ErrorContext } from "./context/ErrorContext";

function App() {
  const [err, setErr] = useContext(ErrorContext);

  return (
    <div className="App">
      {err ? <ErrorModal /> : ""}
      <LoginSub err={err} setErr={setErr} />
    </div>
  );
}

export default App;
