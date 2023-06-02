import axios from "axios";
import React, { useEffect, useState } from "react";
import "./entry.scss";
import Datatable from "../../components/datatable/Datatable";
import Logo from "../../img/logo.png";
import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div className="entry">
      <img src={Logo} alt="Logo" />
      <div className="button-container">
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
      </div>
      <div className="button-container">

        <Link to="/signup">
          <button className="button">Sign Up</button>
        </Link>
        </div>
      <div className="datatable-container">
        <Datatable />
      </div>
    </div>
  );
};

export default Entry;
