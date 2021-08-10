import React from "react";
import SkeletonShimmer from "./SkeletonShimmer";
import Skeleton from "./Skeleton";

type PropType = {
  theme: string | undefined;
};

const SkeletonProfile = ({ theme }: PropType) => {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-profile">
        <div>
          <Skeleton type="avatar" />
        </div>
        <div>
          <Skeleton type="title" />
          <Skeleton type="text" />
          <Skeleton type="text" />
        </div>
      </div>
      <SkeletonShimmer />
    </div>
  );
};

export default SkeletonProfile;
