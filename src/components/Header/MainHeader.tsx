import React from "react";
import SearchBar from "../SearchBar";
import Svg from "../Svg";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Button from "../Button";
import ReactTooltip from "react-tooltip";

import "./header.scss";
import "./badge.scss";

export default function MainHeader() {
  const { isLoggedIn } = useAuth();
  return (
    <header className="header-wrapper">
      <SearchBar />
      <div className="header__actions">
        {isLoggedIn ? (
          <>
            <div className="badge-wrapper">
              <Link to="/noti">
                <Svg icon={"notification"} tooltip={"Notification"} />
                <span className="badge-dot" />
              </Link>
            </div>
            <Avatar />
          </>
        ) : (
          <Button
            customClass={"btn-header-login"}
            variant={"secondary"}
            size={"sm"}
            to={"/login"}
          >
            Login
          </Button>
        )}
      </div>
      <ReactTooltip
        // id={"notification"}
        className="tooltip"
        place="bottom"
        effect="solid"
        delayShow={300}
        backgroundColor="#373d41"
        clickable={true}
      />
    </header>
  );
}
