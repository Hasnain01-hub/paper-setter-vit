import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../reducer";
import { createOrUpdateUser, register } from "../../function/User";
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
import animationData from "../../assets/otp_lootie.json";
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
  const [userdata, setuser] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getdata = JSON.parse(window.localStorage.getItem("user"));
    if (getdata === null) {
      history.push("/register");
    }
    sentotp(getdata);
    setuser(getdata);
  }, []);
  const sentotp = async (getdata) => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const decryptedphone = cryptr.decrypt(getdata.phone);
      // const decryptedpassword = cryptr.decrypt(getdata.password);

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
      // const decryptedphone = cryptr.decrypt(userdata.phone);
      // const decrypteduser = cryptr.decrypt(userdata.user);
      // const idTokenResult = await user.getIdTokenResult();
      // await register(phone, idTokenResult.token)
      //   .then((res) => {
      //     // dispatch(
      //     //   loginSuccess({
      //     //     name: res.data.name,
      //     //     email: res.data.email,
      //     //     phone: res.data.phone,
      //     //     approved: res.data.approved,
      //     //     token: idTokenResult.token,
      //     //     role: res.data.role,
      //     //     _id: res.data._id,
      //     //   })
      //     // );
      //     // roleBasedRedirect(res);
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // history.push("/");
      // alert("successfully Register");

      // Ask user for the verification code. Then:
      const cred = PhoneAuthProvider.credential(verification, otp);
      console.log(cred);
      // const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      // return multiFactor(decrypteduser).enroll(

      //   multiFactorAssertion,
      //   decryptedphone
      // );
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      const user = auth.currentUser;
      await user.multiFactor
        .enroll(multiFactorAssertion, "phone number")
        .then((enrollment) => {
          console.log(enrollment);
          history.push("/home");
        });

      localStorage.removeItem("user");
    } catch (err) {
      toast.error("Invalid OTP");
      console.log(err);
    }
  };
  return (
    <div className="otpscreen">
      {/* <Lottie animationData={animationData} loop={true} /> */}
      <div className="profile-authentication-area">
        <div className="d-table">
          <div className="d-table-cell">
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
        </div>
        <div
          id="2fa-captcha"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otpscreen;
