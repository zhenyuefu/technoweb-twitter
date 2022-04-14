import React from "react";
import "../../style/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";

function Feed() {
  return (
    <div className="feed">
      <div className="feed__header">
        <h2 style={{ margin: 0, fontFamily: "inherit" }}>Home</h2>
      </div>
      <TweetBox />
      <div className="line" style={{ paddingTop: "12px" }}></div>
      <Post />
    </div>
  );
}

export default Feed;
