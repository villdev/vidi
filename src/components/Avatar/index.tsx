import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { getInitials } from "../../utils/getInitials";
import Button from "../Button";
import Svg from "../Svg";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import "@szhsin/react-menu/dist/index.css";
import "./avatar.scss";
import "./contextMenu.scss";

export default function Avatar() {
  const {
    user: { avatar, username },
    logout,
  } = useAuth();

  // const [showContext, setShowContext] = useState(false);

  // const toggleContext = () => {
  //   setShowContext((prevState) => !prevState);
  // };

  return (
    <div
      //   onMouseEnter={() => setShowContext(true)}
      // onMouseEnter={toggleContext}
      // onMouseLeave={toggleContext}
      className="avatar-wrapper"
    >
      {/* <div
        className={
          avatar === "defaultAvatar"
            ? "avatar avatar--default avatar--rounded avatar--lg"
            : "avatar avatar--rounded avatar--lg"
        }
      >
        {avatar === "defaultAvatar" ? (
          getInitials(username)
        ) : (
          <img alt="" src={avatar || ""} />
        )}
      </div> */}

      <Menu
        className="account-context-menu"
        menuButton={
          <MenuButton>
            <div
              className={
                avatar === "defaultAvatar"
                  ? "avatar avatar--default avatar--rounded avatar--lg"
                  : "avatar avatar--rounded avatar--lg"
              }
              // data-tip={username}
            >
              {avatar === "defaultAvatar" ? (
                getInitials(username)
              ) : (
                <img alt="" src={avatar || ""} />
              )}
            </div>
          </MenuButton>
        }
        offsetX={-20}
      >
        <MenuItem className="account-context-menu__item">
          <div className="context-menu-wrapper">
            <div className="account-details">
              <div
                className={
                  avatar === "defaultAvatar"
                    ? "avatar avatar--default avatar--rounded avatar--lg"
                    : "avatar avatar--rounded avatar--lg"
                }
              >
                {avatar === "defaultAvatar" ? (
                  getInitials(username)
                ) : (
                  <img alt="" src={avatar || ""} />
                )}
              </div>
              <div className="user-account">
                <div className="user-account__username">{username}</div>
                {/* <div className="user-account__actions"></div> */}
                <Button
                  customClass="user-account__manage-btn"
                  variant={"link"}
                  to={"./account"}
                >
                  Manage your account
                </Button>
              </div>
            </div>
            <div className="context-menu__separator"></div>
            <div className="context-menu__row">
              <Link to="./channel">
                <Svg customClass={"context-menu-icon"} icon={"channel"} />
                Your Channel
              </Link>
            </div>
            <div className="context-menu__row">
              <Link to="./playlists">
                <Svg customClass={"context-menu-icon"} icon={"list"} />
                Playlists
              </Link>
            </div>
            <div className="context-menu__row">
              <a href="#">
                <Svg customClass={"context-menu-icon"} icon={"ghStar"} />
                Github Source
              </a>
            </div>
            <div className="context-menu__row">
              <Link to="./settings">
                <Svg customClass={"context-menu-icon"} icon={"settings"} />
                Settings
              </Link>
            </div>
            <div className="context-menu__separator"></div>
            <div className="context-menu__row">
              <a onClick={logout}>
                <Svg customClass={"context-menu-icon"} icon={"logout"} />
                Logout
              </a>
            </div>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
