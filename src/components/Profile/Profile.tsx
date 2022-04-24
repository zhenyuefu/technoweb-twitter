import { Avatar } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../utils/utils";
import "../../style/Profile.css";

function Profile() {
  const { username } = useParams();
  console.log(username);
  const { data, error } = useSWR(
    `/api/user/profile?username=${username}`,
    fetcher
  );

  return (
    <div className="profile">
      <div className="profile__header">
        <h2 style={{ margin: 0, fontFamily: "inherit" }}>{username}</h2>
      </div>
      <div className="profile__background">
        <img src={data?.user?.background} alt="background" />
      </div>
      <div className="profile__avatar">
        <Avatar src={data?.user?.avatar} alt="avatar" />
      </div>
      <div className="profile__info">
        <h4 style={{ margin: 0, fontFamily: "inherit" }}>
          {data?.user?.firstName + " " + data?.user?.lastName}
        </h4>
        <p style={{ margin: 0, color: "gray" }}>@{username}</p>
        <p>{data?.user?.introduction}</p>
      </div>
    </div>
  );
}

export default Profile;
