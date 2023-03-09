import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import Cryptr from "cryptr";
import { auth } from "../../Firebase";
import { useSelector } from "react-redux";
window.Buffer = window.Buffer || require("buffer").Buffer;
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setloading] = useState(false);
  const cryptr = new Cryptr("myTotallySecretKey");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  let history = useHistory();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user.approved == true) {
      history.push("/home");
    }
  }, [user, history]);
  const registerWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      if (email !== "" && password !== "" && phone !== "") {
        if (phone.length < 10)
          return toast.error("Please enter a valid phone number");

        /* Creating a new user with the email and password provided. */
        setloading(true);
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        const encryptedphone = cryptr.encrypt(`+91${phone}`);
        const encryptedpassword = cryptr.encrypt(password);
        const userdata = {
          email: email,
          password: encryptedpassword,
          phone: encryptedphone,
          user: user,
        };
        await user
          /* Sending an email to the user with a link to the url provided. */
          .sendEmailVerification({
            url: process.env.REACT_APP_CLIENT_URL + "otp",
          })
          .then(async () => {
            setloading(false);
            window.localStorage.setItem("user", JSON.stringify(userdata));
            setEmail("");
            setPassword("");
            setPhone("");
            toast.success("Email sent");
          });
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("The Email is already in use by another account");
      }
      console.error(err);
      // alert("Register Failed");
    }
  };
  return (
    <div className="profile-authentication-area">
      <div className="d-table1">
        {loading ? (
          <center>
            <h2>Wait email is sending!</h2>{" "}
          </center>
        ) : (
          <span></span>
        )}

        <div className="container">
          <div className="signin-form">
            <h2 style={{ fontWeight: "bold" }}>Register</h2>
            <form>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
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
                      marginTop: "10px",
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
                      marginTop: "10px",
                      marginLeft: "-20px",
                    }}
                    onClick={togglePasswordVisiblity}
                    className="ri-eye-off-line"
                  ></i>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="row align-items-center"></div>
              <button onClick={registerWithEmailAndPassword} type="submit">
                Register
              </button>
              <span className="dont-account">
                Already have an account? <Link to="/">Sign In Now!</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
