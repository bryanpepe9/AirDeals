import styles from "./SignIn.module.css";
import { useState } from "react";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const registerData = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        registerData
      );
      const token = response.data.token; // Assuming the server responds with a token upon successful login
      localStorage.setItem("token", token); // Store the token in local storage
      alert("User signed in successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please try again later.");
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <h1>Sign In</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
