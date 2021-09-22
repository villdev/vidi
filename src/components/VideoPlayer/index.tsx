import React, { useState } from "react";
import { VideoType, userVideoDetailsType } from "../../type/VideoGallery.type";
import ReactPlayer from "react-player/youtube";
import { parseJSON, formatDistanceToNow } from "date-fns";
import ReactTooltip from "react-tooltip";

export const getTimeAgo = (timestamp: string) => {
  const parsedTime = parseJSON(timestamp);
  const timePeriod = formatDistanceToNow(parsedTime);
  return timePeriod;
};

import "./videoPlayer.scss";
import "./checkbox.scss";
import useVideo from "../../hooks/useVideo";
import ClampLines from "react-clamp-lines";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import Svg from "../Svg";
import { useAuth } from "../../context/AuthProvider";
import Button from "../Button";
import { getInitials } from "../../utils/getInitials";
import { Link } from "react-router-dom";
import formatDescription from "../../utils/formatDescription";
import Comments from "../Comment";
import Modal from "react-modal";
// import { debounce } from "ts-debounce";
import PlaylistModal from "../Modal/PlaylistModal";
import axios from "../../axios";

const playlists = [{ name: "Playlist name" }, { name: "Playlist 2" }];

Modal.setAppElement("#root");

type PropType = {
  video: VideoType | null;
  userVideoDetails: userVideoDetailsType;
};

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

export default function VideoPlayer({
  video,
  userVideoDetails: {
    isVideoLiked,
    isChannelFollowed,
    isPresentInWatchLater,
    playlistsStatus,
  },
}: PropType) {
  const {
    user: { id: userId, avatar, username, likedListId },
  } = useAuth();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const [videoLiked, setVideoLiked] = useState(isVideoLiked);
  const [likeCount, setLikeCount] = useState(video?.likes.length);
  const [channelFollowed, setChannelFollowed] = useState(isChannelFollowed);
  const [presentInWatchLater, setPresentInWatchLater] = useState(
    isPresentInWatchLater
  );
  const [currentPlaylistsStatus, setCurrentPlaylistsStatus] = useState(
    playlistsStatus
  );

  const toggleVideoLike = async () => {
    try {
      console.log(likedListId);
      const postBody = {
        likedPlaylistId: likedListId,
      };
      const {
        status,
        data: { message, isLiked },
      } = await axios.post(`/videos/like/${video?._id}/${userId}`, postBody);
      setVideoLiked(isLiked);
      const newLikeCount = isLiked
        ? likeCount + 1
        : likeCount > 0
        ? likeCount - 1
        : 0;
      setLikeCount(newLikeCount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="video-player-wrapper">
      {video ? (
        <>
          <ReactPlayer className="video-player" url={video.url} />
          <ClampLines
            text={video.title}
            id={video._id + "title"}
            lines={2}
            buttons={false}
            className="video-title"
            innerElement="h2"
          />
          <div className="video-details">
            <div className="video-views">
              <Svg icon="show" customClass="view-icon" />
              <span>10,200 views</span>
            </div>
            <div className="video-date">
              {getTimeAgo(video.createdAt) + " ago"}
            </div>
            <div className="video-actions">
              <div
                className={
                  videoLiked
                    ? "video-action video-actions__likes active"
                    : "video-action video-actions__likes"
                }
                data-tip={videoLiked ? "Dislike" : "Like"}
                data-for={"videoActions"}
                onClick={toggleVideoLike}
              >
                <Svg icon="like" customClass="like-icon" />
                <span>{likeCount}</span>
              </div>
              <div
                onClick={() => setModalIsOpen(true)}
                className="video-action video-actions__save"
                data-tip={"Save"}
                data-for={"videoActions"}
              >
                {/* <Svg icon="plus" customClass="add-icon" /> */}
                <Svg icon="bookmark" customClass="add-icon" />
                <span>SAVE</span>
              </div>
            </div>
          </div>
          <div className="video-channel">
            <Link to="/channel">
              <div className="channel">
                <div className="channel-avatar">
                  <div
                    className={
                      video.uploader.avatar === "defaultAvatar"
                        ? "avatar avatar--default avatar--rounded avatar--lg"
                        : "avatar avatar--rounded avatar--lg"
                    }
                    // data-tip={username}
                  >
                    {video.uploader.avatar === "defaultAvatar" ? (
                      getInitials(video.uploader.username)
                    ) : (
                      <img alt="" src={video.uploader.avatar || ""} />
                    )}
                  </div>
                </div>
                <div className="channel-details">
                  <div className="channel-name">{video.uploader.username}</div>
                  <div className="channel-followers">
                    {video.uploader.followers + " Followers"}
                  </div>
                </div>
              </div>
            </Link>

            <div className="channel-actions">
              <Button variant="primary" size="md">
                Follow
              </Button>
            </div>
          </div>

          {showFullDescription ? (
            <div className="video-description">
              {formatDescription(video.description)}
            </div>
          ) : (
            <div
              onClick={() => setShowFullDescription(true)}
              className="video-description-wrapper"
            >
              <ResponsiveEllipsis
                text={formatDescription(video.description)}
                maxLine="2"
                ellipsis=" ...read more"
                trimRight
                basedOn="words"
                className="video-description"
              />
            </div>
          )}

          <Comments
            userId={userId}
            avatar={avatar}
            username={username}
            videoId={video._id}
          />

          <PlaylistModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            // playlists={playlists}
            presentInWatchLater={presentInWatchLater}
            setPresentInWatchLater={setPresentInWatchLater}
            currentPlaylistsStatus={currentPlaylistsStatus}
            setCurrentPlaylistsStatus={setCurrentPlaylistsStatus}
            videoId={video._id}
          />

          <ReactTooltip
            id={"videoActions"}
            className="tooltip"
            place="bottom"
            effect="solid"
            delayShow={150}
            // offset={{ right: 20 }}
            backgroundColor="#373d41"
          />
        </>
      ) : (
        "loading"
      )}
    </div>
  );
}
