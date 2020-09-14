import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseDB";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "plaese wait"}
      <footer>@copyright:brr {new Date().getFullYear()} twitter clone</footer>
    </>
  );
}

export default App;
