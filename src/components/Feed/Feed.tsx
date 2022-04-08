import React from "react";
import "../../style/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";

type Props = {};

function Feed({}: Props) {
  return (
    <div className="feed">
      <div className="feed__header">Home</div>
      <TweetBox />
      <Post />
    </div>
  );
}

export default Feed;
