import TweetManagement from "components/TweetManagement";
import { dbService, storageService } from "firebaseDB";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface TweetDataForm {
  id: string;
  creatorID: string;
  attachedURL: string;
  createdDate: number;
  twitter: string;
}

interface HomeProps {
  userId: string;
}

function Home({ userId }: HomeProps) {
  const [tweetContent, setTweetContent] = useState("");
  const [tweets, setTweets] = useState([] as TweetDataForm[]);
  const [attachedFile, setAttachedFile] = useState(undefined);
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
    e.persist();
    let forAddURL = "";
    if (attachedFile) {
      const fileRefference = storageService
        .ref()
        .child(`${userId}/${uuidv4()}`);
      const response = await fileRefference.putString(
        attachedFile!,
        "data_url"
      );
      forAddURL = await response.ref.getDownloadURL();
    }

    e.preventDefault();
    /* await dbService.collection("tweeter").add({
      twitter: tweetContent,
      createdDate: Date.now(),
      creatorID: userId,
    });
    setTweetContent(""); */

    const tweetInfo = {
      twitter: tweetContent,
      createdDate: Date.now(),
      creatorID: userId,
      attachedURL: forAddURL,
    };
    await dbService.collection("tweeter").add({ ...tweetInfo });
    setTweetContent("");
    setAttachedFile(undefined);
  };

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setTweetContent(value);
  };

  const onFileChange = (e: any) => {
    const {
      target: { files },
    } = e;
    const targetImg = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(targetImg); //! reads the file
    reader.onloadend = (finish: any) => {
      const {
        currentTarget: { result },
      } = finish;
      setAttachedFile(result);
    }; //! get the result
  };

  const deleteImage = () => {
    setAttachedFile(undefined);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {attachedFile && (
          <div>
            <img src={attachedFile} alt="" />
            <button onClick={deleteImage}>Clear Image</button>
          </div>
        )}
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
