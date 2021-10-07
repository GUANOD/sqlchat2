import React, { useContext, useEffect, useState } from "react";
import { get } from "./api/APIconnexion";
import "./app.css";
import Chat from "./components/Chat";
import ErrorModal from "./components/ErrorModal";
import LoginSub from "./components/LoginSub";
import { ErrorContext } from "./context/ErrorContext";
import { ADDRESS } from "./helpers/Address";

function App() {
  const [err, setErr] = useContext(ErrorContext);
  const [validated, setValidated] = useState<boolean>(false);

  //cause HTTP only cookie
  useEffect(() => {
    if (validated) return;

    get(ADDRESS.cookieValidate)
      .then(() => {
        setValidated(true);
      })
      .catch((data) => console.log("rejected", data));
  }, [validated]);

  return (
    <div className="App">
      {err ? <ErrorModal /> : ""}
      {validated ? (
        <Chat />
      ) : (
        <LoginSub err={err} setErr={setErr} setValidated={setValidated} />
      )}
    </div>
  );
}

export default App;
