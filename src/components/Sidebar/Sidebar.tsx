import React from "react";
import "../../style/Sidebar.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SidebarOption from "./SidebarOption";
import { Button, IconButton, SvgIcon } from "@mui/material";
import { useViewport } from "../../context/viewportContext";
import { useNavigate, NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../../context/auth";
import SidebarUser from "./SidebarUser";
import UserPopover from "./UserPopover";

const navlinkStyle = {
  textDecoration: "none",
  color: "black",
};

function handleResponse(response: Response) {
  return response.json().then((json) => {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject(json);
    }
  });
}

function Sidebar() {
  const breakpoint = 768;
  const { width } = useViewport();
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();
  const username = auth.username || "";

  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    })
      .then(handleResponse)
      .then(() => {
        setAuth({
          auth: false,
          uid: "",
          username: "",
        });
        navigate("/");
      });
  };

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitter-icon" />

      <NavLink to="/home" style={navlinkStyle}>
        {({ isActive }) => (
          <SidebarOption active={isActive} Icon={HomeIcon} text="Home" />
        )}
      </NavLink>
      <NavLink to="/search" style={navlinkStyle}>
        <SidebarOption Icon={SearchIcon} text="Search" />
      </NavLink>
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <NavLink to={username} style={navlinkStyle}>
        <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      </NavLink>
      {width < breakpoint ? (
        <IconButton className="sidebar__round-button">
          <SvgIcon>
            <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z" />
          </SvgIcon>
        </IconButton>
      ) : (
        <Button className="sidebar__button" variant="outlined" fullWidth>
          <span>TWEET</span>
        </Button>
      )}

      <UserPopover />
      <Button onClick={handleLogout}>logout temp</Button>
      <SidebarUser username={username}></SidebarUser>
    </div>
  );
}

export default Sidebar;
