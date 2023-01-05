import React, { useState, useEffect } from "react";
import Cryptr from "cryptr";
import "./login.css";
import { getAuth, getMultiFactorResolver } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../Firebase";
// import {
//   multiFactor,
//   PhoneAuthProvider,
//   PhoneMultiFactorGenerator,
//   RecaptchaVerifier,
// } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const cryptr = new Cryptr("myTotallySecretKey");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  let history = useHistory();
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else if (res.data.role === "faculty") {
      history.push("/dashboard");
    }
  };

  // const { user } = useSelector((state) => ({ ...state }));
  // useEffect(() => {
  //   let intended = history.location.state;
  //   if (intended) {
  //     return;
  //   } else {
  //     if (user && user.token) {
  //       history.push("/");
  //     }
  //   }
  // }, [user, history]);
  //to handle form and backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /* A function that is provided by firebase to sign in a user with email and password. */
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === "auth/multi-factor-auth-required") {
        // The user is enrolled in MFA, must be verified
        window.resolver = error.resolver;
      } else if (error.code === "auth/too-many-requests") {
        window.resolver = error.resolver;
      } else {
        console.log(error.code, error.message);
        toast.error("Invalid Credentials");
        return;
      }
    }
    window.localStorage.setItem("approvedsignin", JSON.stringify(true));
    history.push("/loginotp");
  };

  return (
    <>
      <div className="profile-authentication-area">
        <div className="d-table1">
          <div className="container">
            <div className="signin-form">
              <h2 style={{ fontWeight: "bold" }}>Sign In</h2>
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordShown ? (
                    <i
                      style={{
                        position: "absolute",
                        marginTop: "7px",
                        marginLeft: "-20px",
                      }}
                      onClick={togglePasswordVisiblity}
                      className="ri-eye-line"
                    >
                      {" "}
                    </i>
                  ) : (
                    <i
                      style={{
                        position: "absolute",
                        marginTop: "7px",
                        marginLeft: "-20px",
                      }}
                      onClick={togglePasswordVisiblity}
                      className="ri-eye-off-line"
                    ></i>
                  )}
                </div>
                <div className="row align-items-center"></div>
                <button onClick={handleSubmit}>Sign In</button>
                <span className="dont-account">
                  Don't have an account?{" "}
                  <Link to="/register">Sign Up Now!</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
        <div id="2fa-captcha" class="justify-center flex"></div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
