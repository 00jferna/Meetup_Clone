import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const demoUser = {
    credential: "demo",
    password: "password",
  };

  useEffect(() => {
    if (credential.length >= 4) setDisableButton(false);
    if (credential.length < 4) setDisableButton(true);
  }, [credential]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demoLogin = () => {
    dispatch(sessionActions.login(demoUser))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <ul className="login__errors">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input
                    placeholder="Username or Email"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button disabled={disableButton} type="submit">
                  Log In
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <a className="login__demo__link" onClick={demoLogin}>
          Demo User
        </a>
      </form>
    </>
  );
}

export default LoginFormModal;
