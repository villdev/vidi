import React, { useState } from "react";
import ClampLines from "react-clamp-lines";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Button from "../Button";
import Svg from "../Svg";
import AddComment from "./AddComment";
import UserComment from "./UserComment";

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
  const [showReplies, setShowReplies] = useState(false);
  return (
    <>
      <UserComment
        userId={userId}
        avatar={avatar}
        username={username}
        videoId={videoId}
      />
      <div className="replies-wrapper">
        <div className="replies__header">
          <Button
            variant="link"
            size="sm"
            customClass="toggle-replies-btn"
            clickHandler={() => setShowReplies((prevState) => !prevState)}
          >
            {showReplies ? "Hide" : "Show"} 3 replies
          </Button>
        </div>
        <div className="replies">
          {showReplies ? (
            <UserComment
              userId={userId}
              avatar={avatar}
              username={username}
              videoId={videoId}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
