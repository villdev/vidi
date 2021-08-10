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
      <div className="skeleton-article">
        <Skeleton type="title" />
        <Skeleton type="text" />
        <Skeleton type="text" />
        <Skeleton type="text" />
      </div>
      <SkeletonShimmer />
    </div>
  );
};

export default SkeletonArticle;
