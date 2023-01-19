import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getpaper } from "../../function/Subject";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";

const Viewpaper = () => {
  const id = useParams().id;
  const { user } = useSelector((state) => state.user);
  const [data, setData] = React.useState([]);
  const [fdata, setfilter] = React.useState([]);
  React.useEffect(() => {
    if (user && user.token) {
      loadAlldata(user);
    }
  }, [user]);
  const loadAlldata = async (user) => {
    await getpaper(user.token).then((res) => {
      setData(res.data);
      setfilter(res.data.filter((item) => item.addedby == user.email));
    });
  };

  return (
    <>
      <Navbar />
      <Slidebar />
      {user && user.role == "admin" ? (
        <div className="container"></div>
      ) : (
        <h1>Not Authorized</h1>
      )}
    </>
  );
};

export default Viewpaper;
