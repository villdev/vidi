import React, { useState } from "react";
import { SkeletonVideo } from "../skeletons";
import VideoThumbnail from "../VideoThumbnail";
import InfiniteScroll from "react-infinite-scroll-component";
import { VideosType } from "../../type/VideoGallery.type";

import "./videoGallery.scss";
import TagCarousel from "../TagCarousel";

type PropType = {
  videos: VideosType;
  status: string;
  getNextPage: () => Promise<void>;
  totalResults: number;
  tags: Array<string>;
  currentTag: number;
  setCurrentTag: React.Dispatch<React.SetStateAction<number>>;
  initialResults: number;
};

export default function VideoGallery({
  videos,
  status,
  getNextPage,
  totalResults,
  tags,
  currentTag,
  setCurrentTag,
  initialResults,
}: PropType) {
  return (
    <>
      <TagCarousel
        tags={tags}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
      />
      <InfiniteScroll
        dataLength={videos.length}
        next={getNextPage}
        hasMore={videos.length < totalResults}
        loader={
          <div className="video-gallery-wrapper--loader">
            {Array(initialResults / 2)
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
    </>
  );
}
