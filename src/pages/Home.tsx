import React from "react";
import {Outlet} from "react-router-dom";
import {useViewport} from "../context/viewportContext";
import "../style/Home.css";

// import Sidebar from "../components/Sidebar/Sidebar";
const Sidebar = React.lazy(() => import("../components/Sidebar/Sidebar"));

function Home() {
  const {width} = useViewport();
  const breakpoint = 768;

  return (
    <div className="home">
      <Sidebar/>
      <Outlet/>
      {width > breakpoint && (
        <div style={{ display: "flex", width: "100%", flex: 0.6 }}></div>
      )}
    </div>
  );
}

export default Home;
