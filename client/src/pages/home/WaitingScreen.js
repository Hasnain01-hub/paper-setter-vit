import Lottie from "lottie-react";
import { useHistory } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import animationData from "../../assets/waiting.json";
import { auth } from "../../Firebase";
import { logoutSuccess } from "../../reducer";
const WaitingScreen = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    setTimeout(() => {
      auth.signOut().then(() => {
        dispatch(logoutSuccess());
      });
    }, 5000);
  }, [user]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15vh",
        justifyContent: "center",
      }}
    >
      <div>
        <Lottie
          animationData={animationData}
          loop={true}
          autoPlay={true}
          className="lottie"
          style={{ maxWidth: "50%", margin: "0 auto" }}
        />
      </div>
      <div>
        <h3 style={{ textAlign: "center", fontWeight: "600" }}>
          {user ? user.name : "John Doe"} You have'nt been aproved by the admin
        </h3>
      </div>
    </div>
  );
};

export default WaitingScreen;
