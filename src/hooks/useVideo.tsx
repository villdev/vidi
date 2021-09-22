import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "../axios";
import { VideoType, userVideoDetailsType } from "../type/VideoGallery.type";

const useVideo = (videoId: string | null) => {
  const [video, setVideo] = useState<VideoType | null>(null);
  const [status, setStatus] = useState("idle");

  const [userVideoDetails, setUserVideoDetails] = useState<
    userVideoDetailsType
  >({} as userVideoDetailsType);

  const {
    user: { id: userId },
  } = useAuth();

  const getVideo = async () => {
    setStatus("pending");
    try {
      const {
        status,
        data: { video: serverVideo, message },
      } = await axios.get(`/videos/${videoId}`);

      const {
        status: userVidStatus,
        data: {
          isVideoLiked,
          isChannelFollowed,
          isPresentInWatchLater,
          playlistsStatus,
        },
      } = await axios.get(`/users/${userId}/video/${videoId}`);

      if (status === 200 && userVidStatus === 200) {
        setVideo(serverVideo);
        // console.log(data);
        setUserVideoDetails({
          isVideoLiked,
          isChannelFollowed,
          isPresentInWatchLater,
          playlistsStatus,
        });
        setStatus("resolved");
      }
    } catch (error) {
      console.error(error);
      setStatus("rejected");
    }
  };

  useEffect(() => {
    if (status === "idle") {
      getVideo();
    }
  }, []);

  return {
    video,
    userVideoDetails,
    status,
  };
};

export default useVideo;
