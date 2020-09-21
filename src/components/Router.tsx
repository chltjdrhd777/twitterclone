import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

export interface AppPouterProps {
  isLoggedIn?: boolean;
  userInfo: {
    uid: string;
    displayName?: string;
    updateProfile: (args: string) => void;
  };
  refreshedUser?: any;
}

const AppRouter = ({ isLoggedIn, userInfo, refreshedUser }: AppPouterProps) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userInfo={userInfo} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userId={userInfo.uid} />
            </Route>

            <Route exact path="/profile">
              <Profile userInfo={userInfo} refreshedUser={refreshedUser} />
            </Route>

            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
