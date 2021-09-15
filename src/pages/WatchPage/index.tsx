import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainHeader } from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import VideoGallery from "../../components/VideoGallery";
import VideoPlayer from "../../components/VideoPlayer";
import useVideoGallery from "../../hooks/useVideoGallery";
import useVideo from "../../hooks/useVideo";
import useQuery from "../../hooks/useQuery";

import "./watch.scss";
import { SkeletonVideo } from "../../components/skeletons";

export default function Watch() {
  //   v: videoId,
  //   list: playlistId,
  //   index: listIndex,
  //   t: timeElapsed,
  const videoId = useQuery().get("v");
  // const [videoId, setVideoId] = useState(videoIdQuery);

  const {
    videos,
    tags,
    status: galleryStatus,
    getNextPage,
    totalResults,
    currentTag,
    setCurrentTag,
  } = useVideoGallery(6);

  const { video, status } = useVideo(videoId);

  useEffect(() => {
    console.log("------debug: working or not?", videoId);
    if (video && video._id !== videoId) {
      location.reload();
    }
    // console.log("------debug: videoid?", videoId);
    // setVideoId(videoIdQuery);
  }, [videoId]);

  return (
    <>
      <Sidebar />
      <div className="page-wrapper--sidebar">
        <MainHeader />
        <div className="page-content-wrapper watch-content-wrapper">
          {status === "loading" && <SkeletonVideo theme={"dark"} />}
          {status === "resolved" && <VideoPlayer video={video} />}
          <div className="video-recommendation">
            <VideoGallery
              status={galleryStatus}
              videos={videos}
              getNextPage={getNextPage}
              totalResults={totalResults}
              tags={tags}
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
              initialResults={6}
            />
          </div>
        </div>
      </div>
    </>
  );
}
