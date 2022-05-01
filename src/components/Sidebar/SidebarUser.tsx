import React from "react";
import useSWR from "swr";
import {useViewport} from "../../context/viewportContext";
import {fetcher} from "../../utils/utils";
import {Avatar, Dropdown, Menu, Notification} from "@arco-design/web-react";
import {IconUser} from "@arco-design/web-react/icon";
import {logout} from "../../utils/auth";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {authAtom} from "../../context/auth";

type Props = {
  username: string;
};


function SidebarUser({username}: Props) {
  const {data, error} = useSWR(
    `/api/user/profile?username=${username}`,
    fetcher
  );
  const breakpoint = 768;
  const {width} = useViewport();
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);

  const onLogout = async () => {
    try {
      const res = await logout();

      setAuth({
        auth: false,
        uid: "",
        username: "",
      });
      Notification.success({
        title: "Success",
        content: res.message,
      });
      navigate("/");
    } catch (err) {
      Notification.error({title: 'Error', content: (err as Error).message});
    }
  }

  const dropList = (
    <Menu>
      <Menu.Item key="1"
                 style={{display: "flex", width: "100%", height: "60px", alignItems: "center", alignContent: "center"}}>
        <div
          style={{
            display: "flex",
            padding: "12px",
            alignItems: "center",
          }}>
          <div className="sidebar__user__avatar">
            <Avatar>
              {data?.user?.avatar ? <img src={data?.user?.avatar} alt={username}/> : <IconUser/>}
            </Avatar>
          </div>

          <div className="sidebar__user__info">
            <h4 style={{margin: 0, lineHeight: "1.5"}}>
              {data?.user?.firstName + " " + data?.user?.lastName}
            </h4>
            <p style={{margin: 0, color: "gray", lineHeight: "1.5"}}>@{username}</p>
          </div>

        </div>
      </Menu.Item>
      <Menu.Item key='2' onClick={onLogout} style={{display: "flex", width: "100%"}}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown droplist={dropList}>
      <div className="sidebar__user">
        <div className="sidebar__user__avatar">
          <Avatar>
            {data?.user?.avatar ? <img src={data?.user?.avatar} alt={username}/> : <IconUser/>}
          </Avatar>
        </div>
        {width > breakpoint && (
          <div className="sidebar__user__info">
            <h4 style={{margin: 0}}>
              {data?.user?.firstName + " " + data?.user?.lastName}
            </h4>
            <p style={{margin: 0, color: "gray"}}>@{username}</p>
          </div>
        )}
      </div>
    </Dropdown>
  );
}

export default SidebarUser;
