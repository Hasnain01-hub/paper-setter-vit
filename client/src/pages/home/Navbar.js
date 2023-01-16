/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import "./vendors/navbar.css";
// import './vendors/ti-icons/css/themify-icons.css'
import "./vendors/feather.css";
import "./vendors/vendor.bundle.base.css";
import "./vendors/dataTables.bootstrap4.css";
// import Logo from '../images/logo.svg'
// import LogoMini from '../images/logo-mini.svg'
import $ from "jquery";

const Navbar = () => {
  useEffect(() => {
    var body = $("body");
    $('[data-toggle="offcanvas"]').on("click", function () {
      $(".sidebar-offcanvas").toggleClass("active");
    });
    $('[data-toggle="minimize"]').on("click", function () {
      if (
        body.hasClass("sidebar-toggle-display") ||
        body.hasClass("sidebar-absolute")
      ) {
        body.toggleClass("sidebar-hidden");
      } else {
        body.toggleClass("sidebar-icon-only");
      }
    });
  }, []);

  return (
    <>
      <body>
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="navbar-brand brand-logo mr-5" href="/">
              <img
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/ue6gshlqvsqg2vasd89l"
                className="mr-2"
                style={{ height: "50px" }}
                alt="logo"
              />
            </a>
            <a className="navbar-brand brand-logo-mini" href="/">
              <img
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/ue6gshlqvsqg2vasd89l"
                alt="logo"
              />
            </a>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            {/* <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-toggle="minimize"
            >
              <i className="ri-menu-line"></i>
            </button> */}
            <button
              className="navbar-toggler navbar-toggler-right  align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
        </nav>
      </body>
    </>
  );
};

export default Navbar;
