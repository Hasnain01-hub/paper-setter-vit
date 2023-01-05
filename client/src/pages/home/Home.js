import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";

const Home = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user.approved == false) {
      history.push("/");
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <Slidebar />
    </>
  );
};

export default Home;
