import React from "react";
import { MainHeader } from "../../components/Header";
import Sidebar from "../../components/Sidebar";
// import TagCarousel from "../../components/TagCarousel";
import VideoGallery from "../../components/VideoGallery";
import useVideoGallery from "../../hooks/useVideoGallery";

const Home = () => {
  const {
    videos,
    tags,
    status,
    getNextPage,
    totalResults,
    currentTag,
    setCurrentTag,
  } = useVideoGallery(12);

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
          {/* <TagCarousel
            tags={tags}
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
          /> */}
          <VideoGallery
            status={status}
            videos={videos}
            getNextPage={getNextPage}
            totalResults={totalResults}
            tags={tags}
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
            initialResults={12}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
