import React from "react";
import "./skeleton.scss";

type PropType = {
  type: string;
};

function Skeleton({ type }: PropType) {
  const classes = `skeleton ${type}`;

  return <div className={classes}></div>;
}

export default Skeleton;
