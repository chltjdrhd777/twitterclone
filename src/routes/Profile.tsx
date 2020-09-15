import { authService } from "firebaseDB";
import React from "react";

function Profile() {
  const onLogOut = () => {
    authService.signOut();
  };
  return <button onClick={onLogOut}>Log out</button>;
}

export default Profile;
