import React from "react";
import { NavLink } from "react-router-dom";

import "./nav.css";

const nav = props => (
  <header className=" fixed-top bg-dark  py-3">
    <div className="row flex-nowrap justify-content-between align-items-center">
      <div className="col-8 offset-2 d-flex justify-content-center align-items-center">
        <NavLink to="/" className="text-white">
          Home
        </NavLink>
      </div>
      <div className="col-2 d-flex justify-content-end  align-items-center"></div>
    </div>
  </header>
);

export default nav;
