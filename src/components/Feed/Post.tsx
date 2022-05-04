import React from "react";
import "../../style/Post.css";
import {IconUser} from "@arco-design/web-react/icon";
import {Avatar, Button, Comment, Image, Input, Message,} from "@arco-design/web-react";
import {Comments, ShareTwo, ThumbsUp} from "@icon-park/react";
import {useViewport} from "../../context/viewportContext";
import {IPost} from "../../types";
import {useRecoilValue} from "recoil";
import {authAtom} from "../../context/auth";
import useSWR, {useSWRConfig} from "swr";
import {fetcher} from "../../utils/utils";
import {addComment} from "../../utils/post";

type Props = {
  post: IPost;
};

function Post({post}: Props) {
  //user
  const user = useRecoilValue(authAtom);

  const {mutate} = useSWRConfig();
  const {data} = useSWR(
    `/api/user/profile?username=${user.username}`,
    fetcher
  );

  //post
  const {author, imagePath, comments, content, countLikes, countReTweet} =
    post;
  const displayname = `${author.firstName} ${author.lastName}`;
  const {width: windowWidth} = useViewport();
  const width =
    windowWidth < 645 ? "80%" : imagePath && imagePath?.length > 1 ? 200 : 400;
  const height = imagePath && imagePath?.length > 1 ? 150 : 300;

  // comment
  const [like, setLike] = React.useState(false);
  const [re, setRe] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  const [text, setText] = React.useState("");

  const sendComment = () => {
    if (text.length > 0) {
      addComment(post._id, text)
        .then((res) => {
          setText("");
          Message.success(res.message);
          mutate("/api/post");
        })
        .catch((error) => {
          setText("");
          Message.error(error.message);
        });
    }
  };

  const actions = (
    <div className="post__footer">
      <span
        className="custom-comment-action"
        key="reply"
        onClick={() => setShowComment(!showComment)}
      >
        {showComment ? (
          <Comments
            theme="two-tone"
            size="21"
            fill={["#333", "#4a90e2"]}
            strokeWidth={3}
          />
        ) : (
          <Comments theme="outline" size="21" strokeWidth={3}/>
        )}
        Reply
      </span>
      <span
        className="custom-comment-action"
        key="heart"
        onClick={() => setLike(!like)}
      >
        {like ? (
          <ThumbsUp theme="filled" size="21" fill="#FBE842" strokeWidth={3}/>
        ) : (
          <ThumbsUp theme="outline" size="21" strokeWidth={3}/>
        )}{" "}
        {countLikes + (like ? 1 : 0)}
      </span>
      <span
        className="custom-comment-action"
        key="star"
        onClick={() => setRe(!re)}
      >
        {re ? (
          <ShareTwo theme="filled" size="21" fill="#2f88ff" strokeWidth={3}/>
        ) : (
          <ShareTwo theme="outline" size="21" strokeWidth={3}/>
        )}{" "}
        {countReTweet + (re ? 1 : 0)}
      </span>
    </div>
  );

  return (
    <div className="post">
      {/*<div className="post__avatar">*/}
      {/*  <Avatar>*/}
      {/*    {author.avatar ? <img src={author.avatar} alt={author.username}/> : <IconUser/>}*/}
      {/*  </Avatar>*/}
      {/*</div>*/}
      {/*<div className="post__body">*/}
      {/*  <div className="post__header">*/}
      {/*    <h5 style={{margin: 0, marginRight: 4}}>{displayname}</h5>*/}
      {/*    <span>@{author.username}</span>*/}
      {/*  </div>*/}
      {/*  <div className="post__text">*/}
      {/*    {content}*/}
      {/*  </div>*/}
      {/*  <div className="post__image">*/}
      {/*    <Image.PreviewGroup>*/}
      {/*      {imagePath && imagePath.map((src, index) => <Image*/}
      {/*        key={index}*/}
      {/*        src={src.link}*/}
      {/*        width={width}*/}
      {/*        height={height}*/}
      {/*        alt={`image${index + 1}`}*/}
      {/*        loader*/}
      {/*        loading='lazy'*/}
      {/*        style={{margin: 5, borderRadius: 20}}*/}
      {/*      />)}*/}
      {/*    </Image.PreviewGroup>*/}

      {/*  </div>*/}
      {/*  <div className="post__footer">*/}
      {/*    <Button icon={<Comments theme="outline" size="20" fill="#333"/>} style={{*/}
      {/*      backgroundColor: "transparent",*/}
      {/*    }}/>*/}
      {/*    <Button icon={<ThumbsUp theme="outline" size="20" fill="#333"/>} style={{*/}
      {/*      backgroundColor: "transparent",*/}
      {/*    }}/>*/}
      {/*    <Button icon={<ShareTwo theme="outline" size="20" fill="#333"/>} style={{*/}
      {/*      backgroundColor: "transparent",*/}
      {/*    }}/>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Comment
        actions={actions}
        style={{
          marginBottom: 10,
          marginTop: 10,
          width: "100%",
        }}
        avatar={
          <Avatar>
            {author.avatar ? (
              <img src={author.avatar} alt={author.username}/>
            ) : (
              <IconUser/>
            )}
          </Avatar>
        }
        author={
          <div className="post__header">
            <h5 style={{margin: 0, marginRight: 4}}>{displayname}</h5>
            <span>@{author.username}</span>
          </div>
        }
        content={
          <div>
            <div className="post__text">{content}</div>
            <div className="post__image">
              <Image.PreviewGroup>
                {imagePath &&
                  imagePath.map((src, index) => (
                    <Image
                      key={index}
                      src={src.link}
                      width={width}
                      height={height}
                      alt={`image${index + 1}`}
                      loader
                      loading="lazy"
                      style={{margin: 5, borderRadius: 20}}
                    />
                  ))}
              </Image.PreviewGroup>
            </div>
          </div>
        }
      >
        {showComment &&
          comments &&
          comments.map((comment, index) => (
            <Comment
              key={index}
              avatar={
                <Avatar>
                  {comment.author.avatar ? (
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.username}
                    />
                  ) : (
                    <IconUser/>
                  )}
                </Avatar>
              }
              author={
                <div className="post__header">
                  <h5
                    style={{margin: 0, marginRight: 4}}
                  >{`${comment.author.firstName} ${comment.author.lastName}`}</h5>
                  <span>@{comment.author.username}</span>
                </div>
              }
              content={<div className="post__text">{comment.content}</div>}
            />
          ))}
        {showComment && (
          <Comment
            style={{
              width: "90%",
            }}
            align="right"
            actions={[
              <Button
                key="0"
                type="primary"
                shape="round"
                onClick={sendComment}
              >
                Reply
              </Button>,
            ]}
            avatar={
              <Avatar>
                {data?.user?.avatar ? (
                  <img src={data?.user?.avatar} alt={user.username}/>
                ) : (
                  <IconUser/>
                )}
              </Avatar>
            }
            content={
              <div>
                <Input.TextArea
                  placeholder="Add a comment"
                  autoSize={{minRows: 2, maxRows: 6}}
                  maxLength={500}
                  showWordLimit
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    resize: "none",
                  }}
                  value={text}
                  onChange={(e) => setText(e)}
                />
              </div>
            }
          />
        )}
      </Comment>
    </div>
  );
}

export default Post;
