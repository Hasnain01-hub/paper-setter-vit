import { logoutSuccess } from "../../reducer";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/add-subject">
              <i className="ri-building-4-line"></i>&nbsp;
              <span className="menu-title">Add Departments</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              <i className="ri-building-4-line"></i>&nbsp;
              <span className="menu-title">View Departments</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/view-user">
              <i className="ri-file-line"></i>&nbsp;
              <span className="menu-title">View user</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upload-paper">
              <i className="ri-attachment-line"></i>&nbsp;
              <span className="menu-title">Upload Paper</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/testimonials">
              <i className="ri-map-pin-user-line"></i>&nbsp;
              <span className="menu-title">Profile Page</span>
            </Link>
          </li>
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
