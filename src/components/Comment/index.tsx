import React, { useState } from "react";
import AddComment from "./AddComment";
import UserComment from "./UserComment";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import "./comment.scss";
import Svg from "../Svg";
import CommentWrapper from "./CommentWrapper";

export default function Comments({
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
  const [sortBy, setSortBy] = useState<"top" | "new">("top");
  return (
    <div className="video-comments-wrapper">
      <div className="video-comments-header">
        <span className="header-title">
          {" "}
          <span className="bold">3</span> comments
        </span>
        <span className="header-action">
          <Menu
            className="sort-menu"
            menuButton={
              <MenuButton>
                <Svg icon="sort" customClass="icon" /> Sort by
              </MenuButton>
            }
          >
            <MenuItem
              className={
                sortBy === "top" ? "sort-menu__item active" : "sort-menu__item"
              }
              onClick={() => setSortBy("top")}
            >
              Top Comments
            </MenuItem>
            <MenuItem
              className={
                sortBy === "new" ? "sort-menu__item active" : "sort-menu__item"
              }
              onClick={() => setSortBy("new")}
            >
              Newest First
            </MenuItem>
          </Menu>
        </span>
      </div>
      <AddComment
        userId={userId}
        avatar={avatar}
        username={username}
        videoId={videoId}
        cancelFunction={null}
      />
      <CommentWrapper
        userId={userId}
        avatar={avatar}
        username={username}
        videoId={videoId}
      />
    </div>
  );
}
{
  /* <div className="video-comments-wrapper">
            <div className="video-comments-header"></div>
            <div className="add-comment-wrapper"></div>
            <div className="video-comments">
              <div className="video-comment"></div>
            </div>
          </div> */
}
