import React from "react";
import Post from "./Post";
import TweetBox from "./TweetBox";
import useSWR from "swr";
import { fetcher } from "../../utils/utils";
import { IPost } from "../../types";
import {
  BackTop,
  Empty,
  Notification,
  PageHeader,
  Skeleton,
} from "@arco-design/web-react";

function Feed() {
  const { data, error } = useSWR("/api/post", fetcher);

  if (error) {
    Notification.error({
      title: "Error",
      content: error.message,
    });
  }

  return (
    <div className="feed">
      <BackTop
        visibleHeight={30}
        style={{ position: "absolute" }}
        target={() => document.getElementById("posts") as HTMLElement}
      />
      <div className="main__header">
        {/*  <h2 style={{ margin: 0, fontFamily: "inherit" }}>Home</h2>*/}
        <PageHeader title="Home" />
      </div>
      <div id="posts" className="feed">
        <TweetBox />
        <div className="line" style={{ paddingTop: "12px" }}></div>
        <Skeleton loading={!data} image animation>
          {data && data.length > 0 ? (
            data.map((post: IPost) => <Post postId={post._id} key={post._id} />)
          ) : (
            <Empty />
          )}
        </Skeleton>
      </div>
    </div>
  );
}

export default Feed;
