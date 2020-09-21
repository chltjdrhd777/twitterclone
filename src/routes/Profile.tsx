import { AppPouterProps } from "components/Router";
import { authService, dbService } from "firebaseDB";
import React, { useEffect, useState } from "react";

interface ProfileProps {
  uid: string;
  displayName?: string;
  refreshedUser?: any;
}

function Profile({ userInfo, refreshedUser }: AppPouterProps) {
  const [newDisplayName, setNewDisplayName] = useState(userInfo.displayName);

  const onLogOut = () => {
    authService.signOut();
  };

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweeter")
      .where("creatorID", "==", userInfo.uid)
      .orderBy("createdDate", "desc")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (userInfo.displayName !== newDisplayName) {
      userInfo.updateProfile(newDisplayName!);
    }
    refreshedUser();
  };

  useEffect(() => {
    getMyTweets();
  });
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="display Name"
          onChange={onChange}
          value={newDisplayName}
        ></input>
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogOut}>Log out</button>
    </>
  );
}

export default Profile;
