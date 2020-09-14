import { authService } from "firebaseDB";
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
    }
  };

  const toggleEvent = () => {
    setNewAccount((prev) => !prev);
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
        <button>Log in with Google</button>
        <button>Log in with Github</button>
      </div>
    </div>
  );
}

export default Auth;
