import React from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { ButtonPropTypes } from "../../type/ButtonProp.type";

import "./button.scss";

export default function Button({
  customClass,
  variant,
  size,
  clickHandler,
  type,
  to,
  loading,
  children,
}: ButtonPropTypes) {
  const disabledBtn = customClass?.split(" ").includes("btn--disabled");
  const validating = customClass?.split(" ").includes("btn--validating");

  const childElements = loading ? (
    <PulseLoader color={"#690606"} loading={true} size={12} margin={2} />
  ) : (
    children
  );

  return (
    <button
      type={`${type || "button"}`}
      className={`btn ${variant} ${size || "md"} ${customClass || ""}`}
      onClick={clickHandler}
      disabled={!!to || disabledBtn || loading || validating}
    >
      {to ? <Link to={to}>{childElements}</Link> : childElements}
    </button>
  );
}
