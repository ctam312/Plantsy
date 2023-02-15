import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div className="whole-login-container">
      <h3>Sign in</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <ul className="errors-map">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="label-tag-container">
        <label>
          Email address
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        <button className= "log-in-demo-button" type="submit">Sign in</button>
        <button
            className="log-in-demo-button demo-button"
            type="submit"
            onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
            }}
          >
            <span>Demo User</span>
        </button>
        <div className="agreement-div">By clicking Sign in, you agree to Plantsy's <span className="underline-span">Terms of Use</span> and <span className="underline-span">Privacy Policy</span>. Plantsy may send you communications; you may change your preferences in your account settings. We'll never post without your permission.</div>
      </form>
    </div>
  );
}

export default LoginFormModal;
