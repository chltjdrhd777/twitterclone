import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseDB";

function App() {
  const [init, setInit] = useState(false);
  /*  const [isLoggedIn, setIsLoggedIn] = useState(false); */
  const [userObj, setUserObj] = useState(null as any);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        /*       setIsLoggedIn(true); */
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args: string) =>
            user.updateProfile({ displayName: args }),
        });
      } else {
        /*    setIsLoggedIn(false); */
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
    console.log(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userInfo={userObj}
          refreshedUser={refreshUser}
        />
      ) : (
        "plaese wait"
      )}
      <footer>@copyright:brr {new Date().getFullYear()} twitter clone</footer>
    </>
  );
}

export default App;
