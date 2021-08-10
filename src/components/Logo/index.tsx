import React from "react";
import "./logo.scss";
import { Link } from "react-router-dom";

import Svg from "../Svg";

export default function Logo({ showText }: { showText: boolean }) {
  return (
    <div className="logo-wrapper">
      {/* <div className="logo"></div> */}
      <Link to="/">
        <div className="temp-logo">
          <Svg width={"48"} height={"48"} icon={"logo"} />
          {/* {showText && <div className="logo__text">vidi</div>} */}
          {showText && <div className="logo__text">VIDI</div>}
        </div>
      </Link>
    </div>
  );
}
