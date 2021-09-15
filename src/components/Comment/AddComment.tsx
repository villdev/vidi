import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { getInitials } from "../../utils/getInitials";
import Button from "../Button";

export default function AddComment({
  userId,
  avatar,
  username,
  videoId,
  cancelFunction,
}: {
  userId: string | null;
  avatar: string | null;
  username: string | null;
  videoId: string;
  cancelFunction: (() => void) | null;
}) {
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isReply = !!cancelFunction;

  const clearComment = () => {
    if (cancelFunction) {
      cancelFunction();
    }
    setComment("");
    setShowActionButtons(false);
  };

  useEffect(() => {
    if (isReply) {
      textareaRef.current?.focus();
    }
  }, []);

  return (
    <div
      className={isReply ? "add-comment-wrapper reply" : "add-comment-wrapper"}
    >
      <div className="comment-input-wrapper">
        <span className="channel-avatar">
          <div
            className={
              avatar === "defaultAvatar"
                ? "avatar avatar--default avatar--rounded avatar--lg"
                : "avatar avatar--rounded avatar--lg"
            }
          >
            {avatar === "defaultAvatar" ? (
              getInitials(username)
            ) : (
              <img alt="" src={avatar || ""} />
            )}
          </div>
        </span>
        <TextareaAutosize
          className="comment-input"
          placeholder="Write a comment..."
          rows={1}
          onFocus={() => setShowActionButtons(true)}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          ref={textareaRef}
        />
      </div>
      {showActionButtons && (
        <div className="comment-actions">
          <Button variant="secondary" customClass="comment-add-btn" size="sm">
            Comment
          </Button>
          <Button
            variant="link"
            customClass="comment-cancel-btn"
            size="sm"
            clickHandler={clearComment}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
