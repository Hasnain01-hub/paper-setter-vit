import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useSelector } from "react-redux";
import { getuser, userupdate } from "../../function/User";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";
import "./table.css";

const Viewuser = () => {
  const [users, setuser] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const user = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user && user.token) {
      loadAlluser(user);
    }
  }, [user]);
  const loadAlluser = async (user) => {
    await getuser(user.token).then((res) => {
      setuser(res.data);
      setloading(true);
    });
  };
  const handlechange = async (e, s) => {
    e.preventDefault();
    const data = { ...s, [s.target.name]: e.target.value };
    await userupdate(user.token, data).then(() => {
      loadAlluser(user);
      toast.success("User Updated");
      setloading(true);
    });
  };
  return (
    <>
      {console.log(users)}
      <Navbar />
      <Slidebar />
      {loading ? (
        <center>
          <h3>Loading...</h3>
        </center>
      ) : (
        <div>
          <div className="container3">
            <h2>Users</h2>
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col1">Branch</div>
                <div className="col col2" style={{ paddingRight: "6vw" }}>
                  name
                </div>
                <div className="col col3" style={{ paddingRight: "6vw" }}>
                  email
                </div>

                <div className="col col6">role</div>
                <div className="col col7">approved</div>
              </li>
              {users.map((s) => {
                return (
                  <li className="table-row">
                    <div className="col col1" data-label="name">
                      {s.name}
                    </div>
                    <div
                      className="col col3 "
                      data-label="email"
                      style={{ paddingRight: "6vw", wordBreak: "break-word" }}
                    >
                      {s.email}
                    </div>
                    {/* <div className="col col4" data-label="role">
                      {s.role}
                    </div> */}
                    {/* <div className="col col6" data-label="approved">
                      {s.approved}
                    </div> */}
                    <div className="col col7" data-label="role">
                      <select
                        style={{
                          borderRadius: "7px",
                          width: "10vw",
                          textAlign: "center",
                          paddingLeft: "2px",
                          paddingRight: "2px",
                        }}
                        onChange={(e) => handlechange(e, s)}
                        name="role"
                        value={s.role}
                      >
                        <option value={s.role}>{s.role}</option>
                        {s.role === "admin" ? (
                          <option value="user">user</option>
                        ) : (
                          <option value="admin">admin</option>
                        )}
                      </select>
                    </div>

                    <div className="col col8" data-label="approved">
                      <select
                        style={{
                          borderRadius: "7px",
                          width: "10vw",
                          textAlign: "center",
                          paddingLeft: "2px",
                          paddingRight: "2px",
                        }}
                        value={s.approved}
                        onChange={(e) => handlechange(e, s)}
                        name="approved"
                      >
                        <option value={s.approved}>{s.approved}</option>
                        {s.approved == false ? (
                          <option value="true">true</option>
                        ) : (
                          <option value="false">false</option>
                        )}
                      </select>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Viewuser;
