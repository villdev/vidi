import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";
import { getThumbnailUrl } from "../../utils/getThumbnailUrl";
import { getDuration } from "../../utils/getDuration";
import ClampLines from "react-clamp-lines";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import Svg from "../Svg";
import { VideoType } from "../../type/VideoGallery.type";
import ReactTooltip from "react-tooltip";

import "@szhsin/react-menu/dist/index.css";
import "./videoThumbnail.scss";

export default function VideoThumbnail({ video }: { video: VideoType }) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const toggleHoverEffect = () => {
    setIsMouseOver((prevState) => !prevState);
  };

  return (
    <div
      className="video-thumbnail-wrapper"
      onMouseEnter={toggleHoverEffect}
      onMouseLeave={toggleHoverEffect}
    >
      <Link to="/">
        <div className="video-thumbnail">
          <img
            src={getThumbnailUrl(video.thumbnailURL)}
            alt=""
            className="thumbnail"
          />
          <div
            className={
              isMouseOver ? "thumbnail-overlay hover" : "thumbnail-overlay"
            }
          ></div>
          <div className="video-time">{getDuration(video.duration)}</div>
          <div
            className="video-title"
            data-tip={video.title}
            data-for={"videoTitle"}
          >
            {video.title}
          </div>
          {/* <ClampLines
            text={video.title}
            id={video._id}
            lines={1}
            buttons={false}
            className={isMouseOver ? "video-title hover" : "video-title"}
          /> */}

          <Link to="/channel">
            <div className="video-channel">
              <div className="channel-avatar">
                <div
                  className={
                    video.uploader.avatar === "defaultAvatar"
                      ? "avatar avatar--default avatar--rounded avatar--lg"
                      : "avatar avatar--rounded avatar--lg"
                  }
                >
                  {video.uploader.avatar === "defaultAvatar" ? (
                    getInitials(video.uploader.username)
                  ) : (
                    <img alt="" src={video.uploader.avatar || ""} />
                  )}
                </div>
              </div>
              {/* <div className="channel-username">{video.uploader.username}</div> */}
              <ClampLines
                text={video.uploader.username}
                id={video._id + "channel"}
                lines={1}
                buttons={false}
                className="channel-username"
              />
            </div>
          </Link>
          {isMouseOver && (
            <div className="video-more-wrapper">
              <Menu
                className="more-menu"
                menuButton={
                  <MenuButton>
                    <Svg
                      customClass={"btn-more"}
                      width={"32"}
                      height={"32"}
                      icon={"moreOutline"}
                    />
                  </MenuButton>
                }
              >
                <MenuItem className="more-menu__item">Open Video</MenuItem>
                <MenuItem className="more-menu__item">
                  Save to Watch Later
                </MenuItem>
                <MenuItem className="more-menu__item">Add to playlist</MenuItem>
                <MenuItem className="more-menu__item">Go to Channel</MenuItem>
              </Menu>
            </div>
          )}
        </div>
        <ReactTooltip
          id={"videoTitle"}
          className="tooltip"
          place="bottom"
          effect="solid"
          delayShow={300}
          // offset={{ right: 20 }}
          backgroundColor="#373d41"
        />
      </Link>
    </div>
  );
}
