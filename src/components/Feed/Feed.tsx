import React from "react";
import "../../style/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import useSWR from "swr";
import { fetcher } from "../../utils/utils";
import { IPost } from "../../types";
import { Empty, Skeleton } from "@arco-design/web-react";

function Feed() {
  const { data } = useSWR("/api/post", fetcher);

  return (
    <div className="feed">
      <div className="main__header">
        <h2 style={{ margin: 0, fontFamily: "inherit" }}>Home</h2>
      </div>
      <TweetBox />
      <div className="line" style={{ paddingTop: "12px" }}></div>
      <Skeleton loading={!data} image animation>
        {data && data.length > 0 ? (
          data.map((post: IPost) => <Post post={post} key={post._id} />)
        ) : (
          <Empty />
        )}
      </Skeleton>
    </div>
  );
}

export default Feed;
