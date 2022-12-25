import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/two-factor-authentication.json";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../reducer";
import { createOrUpdateUser } from "../../function/User";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../Firebase";
import {
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from "firebase/auth";

const After_login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [verification, setverification] = useState("");
  const [otp, setotp] = useState("");
  const history = useHistory();
  React.useEffect(() => {
    sendOtp();
  }, []);
  const dispatch = useDispatch();
  const sendOtp = async () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "2fa-captcha",
      { size: "invisible" },
      auth
    );
    recaptchaVerifier.render();
    const phoneOpts = {
      multiFactorHint: window.resolver.hints[0],
      session: window.resolver.session,
    };

    const phoneAuthProvider = new PhoneAuthProvider(auth);

    await phoneAuthProvider
      .verifyPhoneNumber(phoneOpts, recaptchaVerifier)
      .then((verificationId) => {
        setverification(verificationId);
      });
  };
  const verify = async (e) => {
    try {
      e.preventDefault();

      const cred = PhoneAuthProvider.credential(verification, otp);
      console.log(cred);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      const credential = await window.resolver
        .resolveSignIn(multiFactorAssertion)
        .then((enrollment) => {
          // const idTokenResult = await user.getIdTokenResult();
          //to add data in mongoDb for email sign in method
          // createOrUpdateUser(idTokenResult.token)
          //   .then((res) => {
          //     dispatch(
          //       loginSuccess({
          //         name: res.data.name,
          //         email: res.data.email,
          //         approved: res.data.approved,
          //         token: idTokenResult.token,
          //         role: res.data.role,
          //         _id: res.data._id,
          //       })
          //     );
          //     // roleBasedRedirect(res);
          //     history.push("/otp");
          //   })
          //   .catch((err) => console.log(err));
          console.log(enrollment);
          history.push("/home");
        });

      console.log(credential);
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
                    <button onClick={verify} type="submit">
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
    </>
  );
};

export default After_login;
