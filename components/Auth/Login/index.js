import { useState, useEffect } from "react";
import Router from "next/router";
import { loginUser } from "../../../lib/auth";
import { removeToken } from "../../../lib/token";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Remove the User's token which saved before.
    removeToken();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      // API call:
      const data = await loginUser(username, password);
      // console.log("Data is :", data);
      // console.log("Payload is :" , data.payload);
      // console.log("Token is :" , data.payload.token);
      if (data.payload && data.payload.token) {
        if (rememberMe) {
          window.localStorage.setItem("token", data.payload.token);
        } else {
          window.sessionStorage.setItem("token", data.payload.token);
        }
        setTimeout(() => {
          Router.push("/dashboard");
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="login_title">로그인</legend>
        <div className="mb-3">
          <label_login htmlFor="usernameInput" className="form-label">
            ID
          </label_login>
          <input
            type="text"
            id="usernameInput"
            className="form-control"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label" style={{'margin-right': '10px','margin-left': '10px'}}>
            PW
          </label>
          <input
            type="password"
            id="passwordInput"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3" style={{'float': 'right'}}>
          <div className="form-check">
            <input style={{'margin-right': '5px'}}
              className="form-check-input"
              type="checkbox"
              id="RememberMeInput"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="RememberMeInput" >
              Remember Account
            </label>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <br></br>
          <button type="submit" className="btn btn-primary" disabled={isLoading}  style={{'float': 'center', 'width': '100%'}}>
            Login
          </button>
      </fieldset>
      <style jsx>{`
                legend{
                    width: 100%;
                    background-color: #666666;
                    margin-bottom: 15px;
                    text-align: center;
                }
                fieldset{
                  background-color: #CCCCCC;
                }
                label_login{
                  margin-right: 10px;
                  margin-left: 18px
                }
            `}
        </style>
    </form>
  );
}
