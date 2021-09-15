import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "../axios";
import { VideoType } from "../type/VideoGallery.type";

const useVideo = (videoId: string | null) => {
  const [video, setVideo] = useState<VideoType | null>(null);
  const [status, setStatus] = useState("idle");

  const getVideo = async () => {
    setStatus("pending");
    try {
      const {
        status,
        data: { video: serverVideo, message },
      } = await axios.get(`/videos/${videoId}`);
      if (status === 200) {
        setVideo(serverVideo);
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
    status,
  };
};

export default useVideo;
