import {Avatar, TextField} from "@mui/material";
import React, {useState} from "react";
import "../../style/TweetBox.css";
import {Button, Image, Message, Upload} from "@arco-design/web-react";
import {UploadItem} from "@arco-design/web-react/es/Upload";

function TweetBox() {

  const [disabled, setDisabled] = React.useState(false)
  const [imgInfos, setImgInfos] = React.useState<any[]>([])


  const onSubmit = (e: Event) => {
    e.stopPropagation();
  };

  const onChange = (files: UploadItem[], file: UploadItem) => {
    const imgList: any[] = [];
    files.forEach(file => {
      if (file.status === "done") {
        imgList.push((file.response as any).data);
      }
    });
    if (file.status === "error") {
      Message.error(((file.response) as any).data.error.message);
    }
    setImgInfos(imgList)
    setDisabled(files.some((x) => x.status !== 'done'))
  };


  const onRemove = (file: UploadItem) => {
    if (file.status === "done") {
      setDisabled(true)
      const deleteHash = (file.response as any).data.deletehash;
      return fetch('https://api.imgur.com/3/image/' + deleteHash, {
          method: 'DELETE',
          headers: {
            Authorization: 'Client-ID ' + import.meta.env.VITE_IMGUR_CLIENT_ID,
          }
        }
      ).then(res => {
        setDisabled(false)
        res.json()
      })
    }
  }

  const [imgPreview, setImgPreview] = useState({
    visible: false,
    src: "",
  });

  const visibleChange = (v: boolean) => {
    setImgPreview({
      src: "",
      visible: v,
    });
  };

  return (
    <div className="tweetbox">
      <Image.Preview
        src={imgPreview.src}
        visible={imgPreview.visible}
        onVisibleChange={visibleChange}
      />

      <div style={{paddingTop: "4px", marginRight: "12px"}}>
        <Avatar/>
      </div>
      <div className="tweetbox__input">
        <TextField
          placeholder="What's happening?"
          type="text"
          variant="standard"
          maxRows={5}
          multiline
          fullWidth
          InputProps={{disableUnderline: true}}
        />

        <div className="tweetbox__picture">
          <Upload
            multiple
            listType="picture-card"
            limit={4}
            accept="image/png, image/jpeg, image/gif, image/tiff, image/webp"
            onPreview={(file) => {
              setImgPreview({
                src: URL.createObjectURL(file.originFile as Blob),
                visible: true,
              });
            }}
            onChange={onChange}
            action="https://api.imgur.com/3/image"
            headers={{Authorization: "Client-ID " + import.meta.env.VITE_IMGUR_CLIENT_ID}}
            name="image"
            onExceedLimit={() => Message.info("You can upload up to 4 images")}
            onRemove={onRemove}
          />
        </div>
        <div className="tweetbox__buttons">
          <Button
            type="primary"
            disabled={disabled}
            className="tweetbox__tweetbutton"
            onClick={onSubmit}>Tweet</Button>

        </div>
      </div>
    </div>
  );
}

export default TweetBox;
