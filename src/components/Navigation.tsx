import { authService } from "firebaseDB";
import React from "react";
import { Link } from "react-router-dom";
import { AppPouterProps } from "./Router";

function Navigation({ userInfo }: AppPouterProps) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/profile">{userInfo.displayName}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
