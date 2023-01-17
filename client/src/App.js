import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { auth } from "./Firebase";
import { currentUser } from "./function/User";
import Slidebar from "./pages/home/Slidebar";
import LoginPage from "./pages/login/Login";
import { loginSuccess } from "../src/reducer/index";
import Register from "./pages/login/Register";
import Otpscreen from "./pages/login/Otpscreen";
import After_login from "./pages/login/After_login";
import Home from "./pages/home/Home";
import WaitingScreen from "./pages/home/WaitingScreen";
import Departments from "./pages/home/Departments";
import Retrive_dept from "./pages/home/Retrive_dept";
import Viewuser from "./pages/home/Viewuser";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        await currentUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              loginSuccess({
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                approved: res.data.approved,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
          })
          .catch();
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/otp" component={Otpscreen} />
        <Route exact path="/loginotp" component={After_login} />
        <Route exact path="/waitingscreen" component={WaitingScreen} />
        <Route exact path="/dashboard" component={Slidebar} />
        {/* <Route exact path="/home" component={Home} /> */}
        <Route exact path="/home" component={Retrive_dept} />
        <Route exact path="/view-user" component={Viewuser} />
        
        <Route exact path="/add-subject" component={Departments} />
      </Switch>
    </>
  );
}

export default App;
