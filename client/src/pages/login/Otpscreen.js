import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../reducer";
import { createOrUpdateUser } from "../../function/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cryptr from "cryptr";
import { auth } from "../../Firebase";
import {
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from "firebase/auth";
import "./login.css";
import Lottie from "lottie-react";
import animationData from "../../assets/two-factor-authentication.json";
import { useHistory } from "react-router-dom";

const Otpscreen = () => {
  const [otp, setotp] = useState("");
  const dispatch = useDispatch();
  const cryptr = new Cryptr("myTotallySecretKey");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [verification, setverification] = useState("");
  // const [userdata, setuser] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getdata = JSON.parse(window.localStorage.getItem("user"));
    if (getdata === null) {
      history.push("/register");
    }
    sentotp(getdata);
  }, []);
  const sentotp = async (getdata) => {
    /* A listener that triggers whenever the authentication state changes. */
    auth.onAuthStateChanged(async (user) => {
      /* Decrypting the phone number that was encrypted in the previous step. */
      const decryptedphone = cryptr.decrypt(getdata.phone);
      // const decryptedpassword = cryptr.decrypt(getdata.password);

      /* Creating a new recaptcha verifier. */
      const recaptchaVerifier = new RecaptchaVerifier(
        "2fa-captcha",
        { size: "invisible" },
        auth
      );
      recaptchaVerifier.render();
      await multiFactor(user)
        .getSession()
        .then(function (multiFactorSession) {
          // Specify the phone number and pass the MFA session.
          const phoneInfoOptions = {
            phoneNumber: decryptedphone,
            session: multiFactorSession,
          };

          const phoneAuthProvider = new PhoneAuthProvider(auth);

          // Send SMS verification code.
          return phoneAuthProvider.verifyPhoneNumber(
            phoneInfoOptions,
            recaptchaVerifier
          );
        })
        .then(function (verificationId) {
          setverification(verificationId);
        });
    });
  };
  const verifyotp = async (e) => {
    e.preventDefault();
    try {
      // Ask user for the verification code. Then:
      /* Creating a credential object that can be used to sign in a user. */
      const cred = PhoneAuthProvider.credential(verification, otp);
      // const decryptedphone = cryptr.decrypt(userdata.phone);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      const user = auth.currentUser;
      /* Enrolling the user in the multi-factor authentication. */
      await user.multiFactor.enroll(multiFactorAssertion, "phone number");

      const userdata = {
        email: user.email,
        phone: user.multiFactor.enrolledFactors[0]["phoneNumber"],
        photourl:
          user.photourl ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTySCspUW6-V1Bzn02W5uXHPgQkQEppx8zhc2gLe3RMnA&s",
      };
      await createOrUpdateUser(userdata)
        .then((res) => {
          dispatch(
            loginSuccess({
              name: res.data.name,
              email: res.data.email,
              phone: res.data.phone,
              approved: res.data.approved,
              picture: res.data.picture,
              // token: user.token,
              role: res.data.role,
              _id: res.data._id,
            })
          );
          history.push("/waitingscreen");
          /* Removing the user from localStorage. */
          localStorage.removeItem("user");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      toast.error("Invalid OTP");
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="otpscreen"
        style={{ display: "flex", flexWrap: "nowrap" }}
      >
        <Lottie
          animationData={animationData}
          loop={true}
          autoPlay={true}
          className="lottie"
          style={{ maxWidth: "20%", margin: "0 auto" }}
        />
        <div className="profile-authentication-area">
          <div className="d-table1">
            <div className="container">
              <div className="signin-form">
                <h2 style={{ fontWeight: "bold" }}>Enter OTP</h2>
                <form>
                  <div className="form-group">
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setotp(e.target.value)}
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
                  <button onClick={verifyotp} type="submit">
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div
            id="2fa-captcha"
            style={{ display: "flex", justifyContent: "center" }}
          ></div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Otpscreen;
