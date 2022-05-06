import React from "react";
import { Empty, Menu, PageHeader, Result, Spin } from "@arco-design/web-react";
import "../../style/Follow.css";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../utils/utils";
import UserCard from "./UserCard";
import { IProfile } from "../../types";

type IProps = {
  keys: "following" | "followers";
};

function Follow(props: IProps) {
  const navigate = useNavigate();
  const { username } = useParams();
  const { data, error } = useSWR<IProfile>(
    `/api/user/profile?username=${username}`,
    fetcher
  );

  return (
    <div className="follow">
      <div className="main__header">
        <PageHeader
          title={`${data?.user.firstName} ${data?.user.lastName}`}
          subTitle={`@${username}`}
          backIcon
          onBack={() => navigate(`/${username}`)}
        />
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[props.keys]}
        onClickMenuItem={(key) => {
          navigate(`/${username}/${key}`);
        }}
      >
        <Menu.Item
          key="followers"
          style={{
            fontWeight: "bold",
            fontSize: "larger",
          }}
        >
          <span>Followers</span>
        </Menu.Item>
        <Menu.Item
          key="following"
          style={{
            fontWeight: "bold",
            fontSize: "larger",
          }}
        >
          <span>Following</span>
        </Menu.Item>
      </Menu>
      {error && <Result status="500" title="This page isn’t working." />}
      {!data && <Spin tip="This may take a while..." />}
      {props.keys === "followers" ? (
        data &&
        data.user.followers &&
        (data.user.followers.length === 0 ? (
          <Empty description="Looking for followers?" />
        ) : (
          <div className="follow__list">
            {data?.user?.followers?.map((follower, index) => (
              <UserCard uid={follower} key={index} />
            ))}
          </div>
        ))
      ) : data && data.user.following && data.user.following.length === 0 ? (
        <Empty description="Looking for following?" />
      ) : (
        <div className="follow__list">
          {data?.user?.following?.map((following, index) => (
            <UserCard uid={following} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Follow;
