import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

import "../style/Home.css";

type Props = {};

function Home({}: Props) {
  return (
    <div className="home">
      <Sidebar />
      <Outlet />
      <div style={{ display: "flex", width: "100%", flex: 0.6 }}></div>
    </div>
  );
}

export default Home;
