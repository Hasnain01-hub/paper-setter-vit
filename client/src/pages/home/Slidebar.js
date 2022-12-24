import React from "react";
import "./slidebar.css";
const Slidebar = () => {
  return (
    <>
      <section class="app">
        <aside class="sidebar">
          <header>Menu</header>
          <nav class="sidebar-nav">
            <ul>
              <li>
                <a href="#">
                  <i class="ion-bag"></i> <span>Shop</span>
                </a>
              </li>

              <li>
                <a href="#">
                  <i class="ion-ios-briefcase-outline"></i>{" "}
                  <span class="">Folio</span>
                </a>
              </li>

              <li>
                <a href="#">
                  <i class="ion-ios-medical-outline"></i>{" "}
                  <span class="">Cocaine</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </section>
    </>
  );
};

export default Slidebar;
