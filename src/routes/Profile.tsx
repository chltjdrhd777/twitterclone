import { authService, dbService } from "firebaseDB";
import React, { useEffect } from "react";
import { HomeProps } from "routes/Home";

function Profile({ userId }: HomeProps) {
  const onLogOut = () => {
    authService.signOut();
  };
  console.log(userId);

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweeter")
      .where("creatorID", "==", userId)
      .orderBy("createdDate", "desc")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweets();
  });
  return <button onClick={onLogOut}>Log out</button>;
}

export default Profile;
