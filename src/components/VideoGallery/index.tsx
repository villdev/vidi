import React, { useState } from "react";
import { SkeletonVideo } from "../skeletons";
import VideoThumbnail from "../VideoThumbnail";
import InfiniteScroll from "react-infinite-scroll-component";
import { VideosType } from "../../type/VideoGallery.type";

import "./videoGallery.scss";

type PropType = {
  videos: VideosType;
  status: string;
  getNextPage: () => Promise<void>;
  totalResults: number;
};

export default function VideoGallery({
  videos,
  status,
  getNextPage,
  totalResults,
}: PropType) {
  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={getNextPage}
      hasMore={videos.length < totalResults}
      loader={
        <div className="video-gallery-wrapper--loader">
          {Array(10)
            .fill("")
            .map((_, i) => (
              <SkeletonVideo key={"skeleton" + i} theme={"dark"} />
            ))}
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          {/* <b>Yay! You have seen all the videos.</b> */}
        </p>
      }
    >
      {videos.length > 0 && (
        <div className="video-gallery-wrapper">
          {videos.map((video) => (
            <VideoThumbnail key={video._id} video={video} />
          ))}
        </div>
      )}
    </InfiniteScroll>
  );
}
