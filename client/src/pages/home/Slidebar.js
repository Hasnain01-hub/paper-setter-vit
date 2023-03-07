import { logoutSuccess } from "../../reducer";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
// import './vendors/ti-icons/css/themify-icons.css'
import { auth } from "../../Firebase";
import "./vendors/feather.css";
import "./vendors/vendor.bundle.base.css";
import "./vendors/dataTables.bootstrap4.css";
const Slidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    auth.signOut().then(() => {
      dispatch(logoutSuccess());
      history.push("/");
    });
  };

  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user && user.approved == false) {
      history.push("/");
    }
  }, [user]);
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              <i className="ri-map-pin-user-line"></i>&nbsp;
              <span className="menu-title">{user && user.email}</span>
            </Link>

            <li
              style={{
                textAlign: "center",
                marginBottom: "0",
                lineHeight: "0.6",
              }}
            >
              <span className="menu-title">{user && user.role}</span>
            </li>
          </li>

          {user && user.role == "admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/add-subject">
                <i className="ri-building-4-line"></i>&nbsp;
                <span className="menu-title">Add Subjects</span>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              <i className="ri-building-4-line"></i>&nbsp;
              <span className="menu-title">View Departments</span>
            </Link>
          </li>
          {user && user.role == "admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/view-user">
                <i className="ri-file-line"></i>&nbsp;
                <span className="menu-title">View user</span>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/upload-paper">
              <i className="ri-attachment-line"></i>&nbsp;
              <span className="menu-title">Upload Paper</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/testimonials">
              <i className="ri-map-pin-user-line"></i>&nbsp;
              <span className="menu-title">Profile Page</span>
            </Link>
          </li> */}
          <li className="nav-item">
            <span className="nav-link">
              <i className="ri-logout-circle-r-line"></i>&nbsp;
              <span onClick={logout} className="menu-title">
                Logout
              </span>
            </span>
          </li>
        </ul>
      </nav>{" "}
    </>
  );
};

export default Slidebar;
