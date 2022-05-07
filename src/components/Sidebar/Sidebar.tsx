import React from "react";
import "../../style/Sidebar.css";
import { IconTwitter } from "@arco-design/web-react/icon";
import {
  Home as IconHome,
  Message as IconEmail,
  Remind as IconNotification,
  Search as IconSearch,
  User as IconUser,
} from "@icon-park/react";

import { Button, Grid } from "@arco-design/web-react";
import SidebarOption from "./SidebarOption";
import { useViewport } from "../../context/viewportContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../context/auth";
import SidebarUser from "./SidebarUser";

const navlinkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const Row = Grid.Row;

function Sidebar() {
  const breakpoint = 768;
  const { width } = useViewport();
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const onTweet = () => {
    navigate("/home");
  };

  const username = auth.username || "";

  return (
    <div
      className="sidebar"
      style={{
        paddingLeft: width < breakpoint ? "4px" : "12px",
        paddingRight: width < breakpoint ? "4px" : "12px",
      }}
    >
      <div
        className="sidebar__top"
        style={{ alignItems: width < breakpoint ? "center" : "flex-start" }}
      >
        <IconTwitter className="sidebar__twitter-icon" />

        <NavLink to="/home" style={navlinkStyle}>
          {({ isActive }) => (
            <SidebarOption active={isActive} Icon={IconHome} text="Home" />
          )}
        </NavLink>
        <NavLink to="/search" style={navlinkStyle}>
          {({ isActive }) => (
            <SidebarOption active={isActive} Icon={IconSearch} text="Search" />
          )}
        </NavLink>
        <SidebarOption Icon={IconNotification} text="Notifications" />
        <SidebarOption Icon={IconEmail} text="Messages" />
        <NavLink to={username} style={navlinkStyle}>
          {({ isActive }) => (
            <SidebarOption active={isActive} Icon={IconUser} text="Profile" />
          )}
        </NavLink>
        {width < breakpoint ? (
          <Button
            className="sidebar__round-button"
            shape="round"
            type="primary"
            onClick={onTweet}
            icon={<iconpark-icon name="tweet" size={"28px"} />}
          />
        ) : (
          <Button className="sidebar__button" type="primary" onClick={onTweet}>
            <span>TWEET</span>
          </Button>
        )}
      </div>

      <Row className="sidebar__down">
        <SidebarUser username={username}></SidebarUser>
      </Row>
    </div>
  );
}

export default Sidebar;
