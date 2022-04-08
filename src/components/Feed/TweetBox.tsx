import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import "../../style/TweetBox.css";
import ImgBox from "./ImgBox";

type Props = {};

function TweetBox({}: Props) {
  const [imgList, setImgList] = useState<Array<string>>([]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    let img = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      setImgList([...imgList, reader.result as string]);
      e.target.value = "";
    };
    reader.readAsDataURL(img);
  };

  const handleDeleteImage = (index: number) => {
    setImgList(imgList.filter((_, i) => i !== index));
  };

  return (
    <div className="tweetbox">
      <div className="tweetbox__input">
        <div>
          <Avatar />
        </div>
        <TextField
          placeholder="What's happening?"
          type="text"
          variant="standard"
          maxRows={5}
          multiline
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
      </div>
      {imgList.length > 0 && (
        <ImgBox img_list={imgList} handleDelete={handleDeleteImage} />
      )}
      <div className="tweetbox__buttons">
        <label htmlFor="icon-button-file">
          <input
            hidden
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleAddImage}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Button className="tweetbox__tweetbutton">Tweet</Button>
      </div>
    </div>
  );
}

export default TweetBox;
