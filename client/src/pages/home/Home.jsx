import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";

const Home = () => {

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">

        </div>
        <div className="listContainer">
          <div className="listTitle">Projelerim</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
