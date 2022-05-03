import React from "react";
import "../../style/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import useSWR from "swr";
import {fetcher} from "../../utils/utils";
import {IPost} from "../../types";


function Feed() {

  const {data, isValidating} = useSWR("/api/post", fetcher);


  return (
    <div className="feed">
      <div className="feed__header">
        <h2 style={{margin: 0, fontFamily: "inherit"}}>Home</h2>
      </div>
      <TweetBox/>
      <div className="line" style={{paddingTop: "12px"}}></div>
      {data && data.map((post: IPost) => (
        <Post post={post} key={post._id}/>
      ))}
    </div>
  );
}

export default Feed;
