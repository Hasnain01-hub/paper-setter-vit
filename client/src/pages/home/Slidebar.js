import { logoutSuccess } from "../../reducer";
import { useHistory } from "react-router-dom";
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
            <a className="nav-link" href="/">
              <i class="ri-building-4-line"></i>&nbsp;
              <span className="menu-title">Departments</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/view-product">
              <i class="ri-file-line"></i>&nbsp;
              <span className="menu-title">View Paper</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact-details">
              <i class="ri-attachment-line"></i>&nbsp;
              <span className="menu-title">Upload Paper</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/testimonials">
              <i class="ri-map-pin-user-line"></i>&nbsp;
              <span className="menu-title">Profile Page</span>
            </a>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <i class="ri-logout-circle-r-line"></i>&nbsp;
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
