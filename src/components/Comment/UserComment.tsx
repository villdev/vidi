import React, { useState } from "react";
import ClampLines from "react-clamp-lines";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Button from "../Button";
import Svg from "../Svg";
import AddComment from "./AddComment";

export default function CommentWrapper({
  userId,
  avatar,
  username,
  videoId,
}: {
  userId: string | null;
  avatar: string | null;
  username: string | null;
  videoId: string;
}) {
  const [commentLiked, setCommentLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(25);
  const [isOpenReplyInput, setIsOpenReplyInput] = useState(false);

  const closeReplyInput = () => {
    setIsOpenReplyInput(false);
  };

  const toggleLike = () => {
    const newLikeCount = commentLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setCommentLiked((prevState) => !prevState);
  };

  return (
    <div>
      <div className="user-comment-wrapper">
        <span className="channel-avatar">
          <Link to="/channel">
            <div
              className={
                "defaultAvatar" === "defaultAvatar"
                  ? // avatar === "defaultAvatar"
                    "avatar avatar--default avatar--rounded avatar--lg"
                  : "avatar avatar--rounded avatar--lg"
              }
            >
              {"defaultAvatar" === "defaultAvatar" ? (
                // {avatar === "defaultAvatar" ? (
                "SK"
              ) : (
                <img alt="" src={"something" || ""} />
                // <img alt="" src={avatar || ""} />
              )}
            </div>
          </Link>
        </span>
        <div className="user-comment">
          <div className="username">
            <Link to="/channel">Shobhit Kuruvilla</Link>
          </div>
          <div className="comment">
            <ClampLines
              text={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaeratsunt temporibus ipsum distinctio, asperiores ducimus voluptasmolestiae adipisci. Optio fugit quis consectetur unde reprehenderit,illo cum! Ea facere magnam ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, dolore eius. Voluptatibus doloribus tempore, distinctio, magnam ducimus nisi consequuntur necessitatibus delectus quasi asperiores dolorum? Non voluptas atque eveniet quam officia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, dolore eius. Voluptatibus doloribus tempore, distinctio, magnam ducimus nisi consequuntur necessitatibus delectus quasi asperiores dolorum? Non voluptas atque eveniet quam officia."
              }
              id={"comment"}
              lines={3}
              buttons={true}
              className="channel-username"
            />
          </div>
          <div className="actions">
            <div
              className={commentLiked ? "comment-like active" : "comment-like"}
              data-tip={commentLiked ? "Unlike" : "Like"}
              data-for={"commentLike"}
              onClick={() => toggleLike()}
            >
              <Svg icon="like" width="16" height="16" customClass="icon" />{" "}
              <span>{likeCount}</span>
            </div>
            <div
              className="comment-reply"
              onClick={() => setIsOpenReplyInput(true)}
            >
              Reply
            </div>
            <div className="comment-date">2 min ago</div>
          </div>
          {isOpenReplyInput ? (
            <AddComment
              userId={userId}
              avatar={avatar}
              username={username}
              videoId={videoId}
              cancelFunction={closeReplyInput}
            />
          ) : null}
          {/* replies wrapper here */}
        </div>

        <ReactTooltip
          id={"commentLike"}
          className="tooltip"
          place="bottom"
          effect="solid"
          delayShow={300}
          // offset={{ right: 20 }}
          backgroundColor="#373d41"
        />
      </div>
    </div>
  );
}
