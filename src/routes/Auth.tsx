import { authService, providerInstance } from "firebaseDB";
import React, { useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  ////////////////////////////////////////////////////////////////
  const onChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let data = null;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const toggleEvent = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (e: any) => {
    const {
      target: { name },
    } = e;

    let provider = null;

    if (name === "google") {
      provider = new providerInstance.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new providerInstance.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider!);
    console.log(data);
  };
  ////////////////////////////////////////////////////////////////
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create your account" : "Log in"}
        />
        {error}
      </form>
      <span onClick={toggleEvent}>
        {newAccount ? "Log in" : "Create your account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Log in with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Log in with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;
