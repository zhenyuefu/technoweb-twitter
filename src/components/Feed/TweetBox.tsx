import React, { useState } from "react";
import "../../style/TweetBox.css";
import {
  Avatar,
  Button,
  Image,
  Input,
  Message,
  Upload,
} from "@arco-design/web-react";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { addPost } from "../../utils/post";
import { IImage } from "../../types";
import { IconUser } from "@arco-design/web-react/icon";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../../utils/utils";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../context/auth";

function TweetBox() {
  const user = useRecoilValue(authAtom);

  const { mutate } = useSWRConfig();
  const { data } = useSWR(
    `/api/user/profile?username=${user.username}`,
    fetcher
  );

  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imgInfos, setImgInfos] = React.useState<IImage[]>([]);
  const [text, setText] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadItem[]>([]);

  const onSubmit = () => {
    setLoading(true);
    addPost({
      content: text,
      images: imgInfos,
    })
      .then((r) => {
        Message.success(r.message);
        setLoading(false);
        setText("");
        setFileList([]);
        setImgInfos([]);
        mutate("/api/post");
      })
      .catch((e) => {
        Message.error(e.message);
        setLoading(false);
      });
  };

  const onChange = (files: UploadItem[], file: UploadItem) => {
    setFileList(files);
    const imgList: IImage[] = [];
    files.forEach((file) => {
      if (file.status === "done") {
        imgList.push((file.response as any).data);
      }
    });
    if (file.status === "error") {
      Message.error((file.response as any).data.error.message);
    }
    setImgInfos(imgList);
    setDisabled(files.some((x) => x.status !== "done"));
  };

  const onRemove = (file: UploadItem, files: UploadItem[]) => {
    if (file.status === "done") {
      setDisabled(true);
      const deleteHash = (file.response as any).data.deletehash;
      return fetch("https://api.imgur.com/3/image/" + deleteHash, {
        method: "DELETE",
        headers: {
          Authorization: "Client-ID " + import.meta.env.VITE_IMGUR_CLIENT_ID,
        },
      }).then((res) => {
        setDisabled(false);
        res.json().then((r) => {
          if (r.success) {
            Message.success("Delete success");
            setFileList(files);
          } else {
            Message.error("Delete failed");
          }
        });
      });
    }
  };

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

      <div style={{ paddingTop: "4px", marginRight: "12px" }}>
        <Avatar>
          {data?.user?.avatar ? (
            <img src={data?.user?.avatar} alt={user.username} />
          ) : (
            <IconUser />
          )}
        </Avatar>
      </div>
      <div className="tweetbox__input">
        <Input.TextArea
          placeholder="What's happening?"
          autoSize={{ minRows: 2, maxRows: 6 }}
          maxLength={500}
          showWordLimit
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            resize: "none",
            fontSize: 20,
          }}
          value={text}
          onChange={(e) => setText(e)}
        />

        <div className="tweetbox__picture">
          <Upload
            fileList={fileList}
            multiple
            listType="picture-card"
            limit={4}
            accept="image/png, image/jpeg, image/gif, image/tiff"
            onPreview={(file) => {
              setImgPreview({
                src: URL.createObjectURL(file.originFile as Blob),
                visible: true,
              });
            }}
            onChange={onChange}
            action="https://api.imgur.com/3/image"
            headers={{
              Authorization:
                "Client-ID " + import.meta.env.VITE_IMGUR_CLIENT_ID,
            }}
            name="image"
            onExceedLimit={() => Message.info("You can upload up to 4 images")}
            onRemove={onRemove}
            onProgress={(file) => {
              setFileList((v) => {
                return v.map((x) => {
                  return x.uid === file.uid ? file : x;
                });
              });
            }}
          />
        </div>
        <div className="tweetbox__buttons">
          <Button
            type="primary"
            disabled={disabled}
            loading={loading}
            shape="round"
            onClick={onSubmit}
          >
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
