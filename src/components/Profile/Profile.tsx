/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../utils/utils";
import "../../style/Profile.css";
import {
  Avatar,
  BackTop,
  Button,
  Empty,
  Image,
  Input,
  Message,
  Modal,
  PageHeader,
  Result,
  Skeleton,
  Steps,
  Upload,
} from "@arco-design/web-react";
import { IconCamera, IconTwitter, IconUser } from "@arco-design/web-react/icon";
import { CalendarDot } from "@icon-park/react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../context/auth";
import { follow, unfollow, updateProfile } from "../../utils/user";
import { IImage, IPost } from "../../types";
import Post from "../Feed/Post";
import { Cropper } from "../Crops";
import { UploadItem } from "@arco-design/web-react/es/Upload";

function DeleteImgurImage(deleteHash: string) {
  return fetch("https://api.imgur.com/3/image/" + deleteHash, {
    method: "DELETE",
    headers: {
      Authorization: "Client-ID " + import.meta.env.VITE_IMGUR_CLIENT_ID,
    },
  });
}

function Profile() {
  const [visible, setVisible] = React.useState(false);
  const [current, setCurrent] = React.useState(1);
  const [disabled, setDisabled] = React.useState(false);
  const [bgPicture, setBgPicture] = React.useState<IImage>();
  const [avatar, setAvatar] = React.useState<IImage>();
  const [introduction, setIntroduction] = React.useState("");
  const user = useRecoilValue(authAtom);
  const { username } = useParams();
  const { data, error, mutate } = useSWR(
    `/api/user/profile?username=${username}`,
    fetcher
  );
  const { data: posts, error: perror } = useSWR(
    () => "/api/post?author=" + data.user._id,
    fetcher
  );

  const onRemoveBg = (file: UploadItem) => {
    if (file.status === "done") {
      setDisabled(true);
      const deleteHash = (file.response as any).data.deletehash;
      return DeleteImgurImage(deleteHash).then((res) => {
        setDisabled(false);
        res.json().then((r) => {
          if (r.success) {
            Message.success("Delete success");
            setBgPicture(undefined);
          } else {
            Message.error("Delete failed");
          }
        });
      });
    }
  };

  const onRemoveAvatar = (file: UploadItem) => {
    if (file.status === "done") {
      setDisabled(true);
      const deleteHash = (file.response as any).data.deletehash;
      return fetch("https://api.imgur.com/3/image/" + deleteHash, {
        method: "DELETE",
        headers: {
          Authorization: "Client-ID " + import.meta.env.VITE_IMGUR_CLIENT_ID,
        },
      })
        .then((res) => {
          setDisabled(false);
          res.json().then((r) => {
            if (r.success) {
              Message.success("Delete success");
              setAvatar(undefined);
            } else {
              Message.error("Delete failed");
            }
          });
        })
        .catch((err) => {
          setDisabled(false);
          Message.error("Delete failed" + err.message);
        });
    }
  };

  return (
    <div className="profile">
      <BackTop
        visibleHeight={30}
        style={{ position: "absolute" }}
        target={() => document.getElementById("posts") as HTMLElement}
      />
      <div className="main__header">
        <PageHeader
          title={
            error
              ? "Profile"
              : `${data?.user?.firstName} ${data?.user?.lastName}`
          }
          subTitle={`@${username}`}
        />
      </div>
      <div className="profile__body" id="posts">
        <div className="profile__background">
          {data?.user?.bgPicture && (
            <Image
              src={data?.user?.bgPicture}
              alt="background"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
        {error ? (
          <div className="profile__error">
            <Result
              status="404"
              title="This account doesn’t exist "
              subTitle="Try searching for another."
            />
          </div>
        ) : (
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
                  <Button
                    shape="round"
                    size="large"
                    onClick={() => setVisible(true)}
                  >
                    Set up profile
                  </Button>
                ) : (
                  <Button
                    shape="round"
                    size="large"
                    status={
                      data?.user?.followers?.includes(user.uid)
                        ? "danger"
                        : "default"
                    }
                    type={
                      data?.user?.followers?.includes(user.uid)
                        ? "outline"
                        : "default"
                    }
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
                  <span style={{ color: "var(--color-text-3)" }}>
                    Following
                  </span>
                </div>
              </Link>
              <Link to={`/${data?.user?.username}/followers`}>
                <div className="profile__friends_field">
                  <span style={{ fontWeight: "bold" }}>
                    {data?.user?.followers?.length || 0}{" "}
                  </span>
                  <span style={{ color: "var(--color-text-3)" }}>
                    Followers
                  </span>
                </div>
              </Link>
            </div>

            {perror ? (
              <Result status="500" title={perror.message} />
            ) : (
              <Skeleton loading={!posts} image animation>
                {posts && posts.length > 0 ? (
                  posts.map((post: IPost) => (
                    <Post post={post} key={post._id} />
                  ))
                ) : (
                  <Empty />
                )}
              </Skeleton>
            )}
          </div>
        )}
      </div>
      <Modal
        title={<IconTwitter />}
        visible={visible}
        className="modal-demo-without-content-spacing"
        onCancel={() => {
          setVisible(false);
          setCurrent(1);
          setIntroduction("");
          if (bgPicture) {
            DeleteImgurImage(bgPicture.link).then(() => {
              setBgPicture(undefined);
            });
          }
          if (avatar) {
            DeleteImgurImage(avatar.link).then(() => {
              setAvatar(undefined);
            });
          }
        }}
        confirmLoading={true}
        footer={[
          <Button
            shape="round"
            key="foot"
            style={{
              width: "80%",
            }}
            loading={disabled}
            onClick={() => {
              if (current < 3) {
                setCurrent(current + 1);
              } else {
                const data = {
                  avatar: avatar?.link,
                  bgPicture: bgPicture?.link,
                  introduction: introduction,
                };
                console.log(data);
                setDisabled(true);
                updateProfile(data)
                  .then((res) => {
                    setDisabled(false);
                    setVisible(false);
                    setCurrent(1);
                    setIntroduction("");
                    setBgPicture(undefined);
                    setAvatar(undefined);
                    Message.success(res.message);
                    mutate();
                  })
                  .catch((err) => {
                    setDisabled(false);
                    Message.error(err.message);
                    mutate();
                  });
              }
            }}
          >
            {current < 3 ? "Next" : "Submit"}
          </Button>,
        ]}
      >
        <div style={{ padding: "16px 0" }}>
          <Steps
            size="small"
            lineless
            current={current}
            style={{ maxWidth: 375, margin: "0 auto" }}
          >
            <Steps.Step title="Avatar" />
            <Steps.Step title="Picture" />
            <Steps.Step title="Introduction" />
          </Steps>
        </div>
        <div style={{ padding: "24px 20px" }}>
          {current === 1 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <h2 style={{ margin: 0 }}>Pick a profile picture</h2>
                <p style={{ margin: 0, color: "var(--color-text-3)" }}>
                  Have a favorite selfie? Upload it now.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <Upload
                  limit={1}
                  accept="image/png, image/jpeg, image/gif, image/tiff"
                  action="https://api.imgur.com/3/image"
                  headers={{
                    Authorization:
                      "Client-ID " + import.meta.env.VITE_IMGUR_CLIENT_ID,
                  }}
                  name="image"
                  onRemove={onRemoveAvatar}
                  onChange={(_, file) => {
                    setDisabled(true);
                    if (file.status === "done") {
                      setAvatar((file.response as any).data);
                      setDisabled(false);
                    }
                  }}
                  beforeUpload={(file) => {
                    return new Promise((resolve) => {
                      const modal = Modal.confirm({
                        title: "Crop your picture",
                        onCancel: () => {
                          Message.info("Cancel");
                          resolve(false);
                          modal.close();
                        },
                        simple: false,
                        content: (
                          <div>
                            <p
                              style={{
                                margin: 0,
                                color: "rgb(var(--danger-6))",
                              }}
                            >
                              {" "}
                              Crop images may get stuck, please change the
                              window size or click the rotate button.
                            </p>
                            <Cropper
                              file={file}
                              onOk={(file) => {
                                resolve(file);
                                modal.close();
                              }}
                              onCancel={() => {
                                resolve(false);
                                Message.info("Cancel Upload");
                                modal.close();
                              }}
                            />
                          </div>
                        ),
                        footer: null,
                      });
                    });
                  }}
                  renderUploadItem={(originNode, file) => {
                    if (file.status === "done") {
                      return (
                        <div>
                          <Avatar size={150}>
                            <img
                              src={(file.response as any).data?.link}
                              alt={username}
                            />
                          </Avatar>
                          {originNode}
                        </div>
                      );
                    }
                    return originNode;
                  }}
                >
                  <Avatar
                    triggerIcon={<IconCamera />}
                    triggerType="mask"
                    size={150}
                  >
                    {data?.user?.avatar ? (
                      <img src={data?.user?.avatar} alt={username} />
                    ) : (
                      <IconUser />
                    )}
                  </Avatar>
                </Upload>
              </div>
            </div>
          )}
          {/*background-picture*/}
          {current === 2 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <h2 style={{ margin: 0 }}>Pick a header</h2>
                <p style={{ margin: 0, color: "var(--color-text-3)" }}>
                  People who visit your profile will see it. Show your style.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <Upload
                  style={{ width: "100%" }}
                  listType="picture-card"
                  limit={1}
                  accept="image/png, image/jpeg, image/gif, image/tiff"
                  action="https://api.imgur.com/3/image"
                  headers={{
                    Authorization:
                      "Client-ID " + import.meta.env.VITE_IMGUR_CLIENT_ID,
                  }}
                  name="image"
                  onRemove={onRemoveBg}
                  onChange={(_, file) => {
                    setDisabled(true);
                    if (file.status === "done") {
                      setDisabled(false);
                      setBgPicture((file.response as any).data);
                    }
                  }}
                />
              </div>
            </div>
          )}
          {/*introduction*/}
          {current === 3 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <h2 style={{ margin: 0 }}>Describe yourself</h2>
                <p style={{ margin: 0, color: "var(--color-text-3)" }}>
                  What makes you special? Don&apos;t think too hard, just have
                  fun with it.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <Input.TextArea
                  value={introduction}
                  onChange={setIntroduction}
                  placeholder="Your bio"
                  maxLength={160}
                  showWordLimit
                  autoSize={{ minRows: 3, maxRows: 20 }}
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    resize: "none",
                    fontSize: 15,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
