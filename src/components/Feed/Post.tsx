import React from "react";
import { Avatar } from "@mui/material";
import "../../style/Post.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import PublishIcon from "@mui/icons-material/Publish";

type Props = {
  displayname?: string;
  username?: string;
  text?: string;
  image?: string;
  avatar?: string;
};

function Post({ displayname, username, text, image, avatar }: Props) {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={avatar} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <h3>{displayname}</h3>
          <span>@{username}</span>
        </div>
        <div className="post__text">
          {text}
          <img src={image} alt="" />
        </div>
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatOutlinedIcon fontSize="small" />
          <FavoriteBorderOutlinedIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
