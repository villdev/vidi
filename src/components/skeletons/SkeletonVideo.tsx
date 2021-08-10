import React from "react";
import SkeletonShimmer from "./SkeletonShimmer";
import Skeleton from "./Skeleton";

type PropTypes = {
  theme: string | undefined;
};

const SkeletonArticle = ({ theme }: PropTypes) => {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-video">
        <Skeleton type="time" />
        <Skeleton type="title" />
        <div className="skeleton-channel-wrapper">
          <Skeleton type="avatar" />
          <Skeleton type="text" />
        </div>
      </div>
      <SkeletonShimmer />
    </div>
  );
};

export default SkeletonArticle;
