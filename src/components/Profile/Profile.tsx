import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../utils/utils";
import "../../style/Profile.css";
import { Avatar, Button, Image, Message } from "@arco-design/web-react";
import { IconUser } from "@arco-design/web-react/icon";
import { CalendarDot } from "@icon-park/react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../context/auth";
import { follow, unfollow } from "../../utils/user";

function Profile() {
  const user = useRecoilValue(authAtom);
  const { username } = useParams();
  const { data, mutate } = useSWR(
    `/api/user/profile?username=${username}`,
    fetcher
  );

  return (
    <div className="profile">
      <div className="main__header">
        <h2 style={{ margin: 0, fontFamily: "inherit" }}>{username}</h2>
      </div>
      <div>
        <div className="profile__background">
          {data?.user?.background && (
            <Image src={data?.user?.background} alt="background" />
          )}
        </div>
        <div className="profile__info">
          <div className="profile__avatar__row">
            <div className="profile__avatar">
              <Avatar
                size={133.5}
                style={{
                  borderRadius: 9999,
                  borderColor: "var(--twitter-background-color)",
                  borderWidth: "5px",
                  borderStyle: "solid",
                }}
              >
                {data?.user?.avatar ? (
                  <img src={data?.user?.avatar} alt={username} />
                ) : (
                  <IconUser />
                )}
              </Avatar>
            </div>
            <div className="profile__buttons">
              {user?.username === username ? (
                <Button shape="round" size="large">
                  Set up profile
                </Button>
              ) : (
                <Button
                  shape="round"
                  size="large"
                  onClick={async () => {
                    try {
                      if (data?.user?.followers?.includes(user.uid)) {
                        await unfollow(data?.user?._id);
                        await mutate();
                      } else {
                        await follow(data?.user?._id);
                        await mutate();
                      }
                    } catch (e) {
                      Message.error((e as Error).message);
                    }
                  }}
                >
                  {data?.user?.followers?.includes(user.uid)
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              )}
            </div>
          </div>
          <h4 style={{ margin: 0, fontFamily: "inherit" }}>
            {data?.user?.firstName + " " + data?.user?.lastName}
          </h4>
          <p style={{ margin: 0, color: "gray" }}>@{username}</p>
          <p>{data?.user?.introduction}</p>
          <div className="profile__icons">
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <CalendarDot theme="outline" />
              <p style={{ margin: 0, color: "gray", marginLeft: 5 }}>
                Joined{" "}
                {new Date(data?.user?.createAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
          <div className="profile__friends">
            <Link to={`/${data?.user?.username}/following`}>
              <div className="profile__friends_field">
                <span style={{ fontWeight: "bold" }}>
                  {data?.user?.following?.length || 0}{" "}
                </span>
                <span style={{ color: "var(--color-text-3)" }}>Following</span>
              </div>
            </Link>
            <Link to={`/${data?.user?.username}/followers`}>
              <div className="profile__friends_field">
                <span style={{ fontWeight: "bold" }}>
                  {data?.user?.followers?.length || 0}{" "}
                </span>
                <span style={{ color: "var(--color-text-3)" }}>Followers</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
