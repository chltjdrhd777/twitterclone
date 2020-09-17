import { dbService } from "firebaseDB";
import React, { useState } from "react";
import { TweetDataForm } from "routes/Home";

interface TweetManagementProps {
  props: TweetDataForm;
  whoWroteThis: boolean;
}

function TweetManagement(e: TweetManagementProps) {
  const [edit, setEdit] = useState(false);
  const [newTweet, setNewTweet] = useState(e.props.twitter);
  const onDelete = async () => {
    const confirming = window.confirm("are you sure?");
    if (confirming) {
      await dbService.collection("tweeter").doc(`${e.props.id}`).delete();
    }
  };
  const toggleEditing = () => setEdit((prev) => !prev);
  const onSubmitEdit = async (event: any) => {
    event.preventDefault();
    await dbService
      .collection("tweeter")
      .doc(`${e.props.id}`)
      .update({ twitter: newTweet });

    toggleEditing();
  };

  const onChangeEdit = (e: any) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };

  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmitEdit}>
            <input
              type="text"
              placeholder="edit this"
              value={newTweet}
              onChange={onChangeEdit}
              required
            />
            <input type="submit" value="change tweet" />
          </form>
          <button onClick={toggleEditing}>return to tweet again</button>
        </>
      ) : (
        <>
          <h4>{e.props.twitter}</h4>{" "}
          {e.whoWroteThis && (
            <>
              <button onClick={onDelete}>Delete this</button>
              <button onClick={toggleEditing}>Addit this</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TweetManagement;
