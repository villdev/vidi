import React from "react";
import { MainHeader } from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TagCarousel from "../../components/TagCarousel";
import VideoGallery from "../../components/VideoGallery";
import useVideoGallery from "../../hooks/useVideoGallery";

export default function Home() {
  const {
    videos,
    tags,
    status,
    getNextPage,
    totalResults,
    currentTag,
    setCurrentTag,
  } = useVideoGallery();

  return (
    <>
      <Sidebar />
      <div className="page-wrapper--sidebar">
        <MainHeader />
        <div className="page-content-wrapper">
          {/* {
            status === "idle" || "loading" ? (
              <VideoGallery />
            )
          } */}
          <TagCarousel
            tags={tags}
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
          />
          <VideoGallery
            status={status}
            videos={videos}
            getNextPage={getNextPage}
            totalResults={totalResults}
          />
        </div>
      </div>
    </>
  );
}
