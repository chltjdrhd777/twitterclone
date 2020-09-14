import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import firebaseDefinition from "firebase/index";

interface AppPouterProps {
  isLoggedIn: boolean;
}

const AppRouter = ({ isLoggedIn }: AppPouterProps) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
