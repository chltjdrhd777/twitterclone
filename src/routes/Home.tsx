import TweetManagement from "components/TweetManagement";
import { dbService } from "firebaseDB";
import React, { useEffect, useState } from "react";

export interface TweetDataForm {
  createdDate: number;
  twitter: string;
  id: string;
  creatorID: string;
}

interface HomeProps {
  userId: string;
}

function Home({ userId }: HomeProps) {
  const [tweetContent, setTweetContent] = useState("");
  const [tweets, setTweets] = useState([] as TweetDataForm[]);
  /*  const getTweetsFromServer = async () => {
    const comments = await dbService.collection("tweeter").get();
    comments.forEach((document) => {
      const whatIsInThere = {
        ...document.data(),
        id: document.id,
      } as TweetDataForm;
      setTweets((prev: any[]) => [whatIsInThere, ...prev]);
    });
  }; */
  useEffect(() => {
    /*  getTweetsFromServer(); */

    //! realtime update part
    dbService.collection("tweeter").onSnapshot((snapshot) => {
      const getTweetsFromServer = snapshot.docs.map((everyDoc) => ({
        ...(everyDoc.data() as TweetDataForm),
        id: everyDoc.id,
      }));
      setTweets(getTweetsFromServer);
    });
  }, []);

  console.log(tweets);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await dbService.collection("tweeter").add({
      twitter: tweetContent,
      createdDate: Date.now(),
      creatorID: userId,
    });
    setTweetContent("");
  };

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setTweetContent(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="emotion"
          maxLength={120}
          value={tweetContent}
          onChange={onChange}
        ></input>
        <input type="submit" value="tweet" />
      </form>

      <div>
        {tweets.map((e) => (
          <TweetManagement
            key={e.id}
            props={e}
            whoWroteThis={e.creatorID === userId}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
