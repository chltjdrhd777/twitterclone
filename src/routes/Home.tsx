import { dbService } from "firebaseDB";
import React, { useEffect, useState } from "react";

interface TweetDataForm {
  createdDate: number;
  twitter: string;
  id: string;
}

function Home() {
  const [tweetContent, setTweetContent] = useState("");
  const [tweets, setTweets] = useState([] as TweetDataForm[]);
  const getTweetsFromServer = async () => {
    const comments = await dbService.collection("tweeter").get();
    comments.forEach((document) => {
      const whatIsInThere = {
        ...document.data(),
        id: document.id,
      } as TweetDataForm;
      setTweets((prev: any[]) => [whatIsInThere, ...prev]);
    });
  };
  useEffect(() => {
    getTweetsFromServer();
  }, []);

  console.log(tweets);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await dbService.collection("tweeter").add({
      twitter: tweetContent,
      createdDate: Date.now(),
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
          <div key={e.id}>
            <h4>{e.twitter}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
