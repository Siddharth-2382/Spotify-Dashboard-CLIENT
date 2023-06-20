import React, { useState, useEffect } from "react";

import { token } from "../spotify";
import LoginScreen from "./LoginScreen";
import Home from "./Home";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    setAccessToken(token);
  }, []);

  return <>{accessToken ? <Home /> : <LoginScreen />}</>;
};

export default App;
