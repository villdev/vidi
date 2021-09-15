import React, { useState } from "react";
import "./sidebar.scss";
import Svg from "../Svg";
import { Link, useLocation } from "react-router-dom";

import Logo from "../Logo";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname: activeMenu } = useLocation();

  return (
    <div
      className={isOpen ? "sidebar" : "sidebar close"}
      // onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="logo-details">
        <Logo showText={isOpen} />
        {/* <span className="logo_name">vidi</span> */}
      </div>
      <div className="sidebar-separator--x"></div>
      <ul className="nav-links">
        <li title={"home"} className={activeMenu === "/" ? "active" : ""}>
          <Link to="/">
            <Svg
              customClass="link_icon"
              width={"24"}
              height={"24"}
              icon={"home"}
            />
            <span className="link_name">Home</span>
          </Link>
        </li>
        <li className={activeMenu === "/feed" ? "active" : ""}>
          <Link to="/feed">
            <Svg
              customClass="link_icon"
              width={"24"}
              height={"24"}
              icon={"feed"}
            />
            <span className="link_name">Feed</span>
          </Link>
        </li>
        {/* <div className="sidebar-separator--x"></div> */}
        <li className={activeMenu === "/playlists" ? "active" : ""}>
          <Link to="/playlists">
            <Svg
              customClass="link_icon"
              width={"24"}
              height={"24"}
              icon={"list"}
            />
            <span className="link_name">Playlists</span>
          </Link>
        </li>
        <li className={activeMenu === "/wl" ? "active" : ""}>
          <Link to="/wl">
            <Svg
              customClass="link_icon"
              width={"24"}
              height={"24"}
              icon={"bookmark"}
            />
            <span className="link_name">Watch Later</span>
          </Link>
        </li>
        <li className={activeMenu === "/lv" ? "active" : ""}>
          <Link to="/lv">
            <Svg
              customClass="link_icon"
              width={"24"}
              height={"24"}
              icon={"like"}
            />
            <span className="link_name">Liked Videos</span>
          </Link>
        </li>
        {/* <div className="sidebar-separator--x"></div> */}
        <li className={activeMenu === "/history" ? "active" : ""}>
          <Link to="/history">
            <Svg
              customClass="link_icon"
              width={"24"}
              height={"24"}
              icon={"history"}
            />
            <span className="link_name">History</span>
          </Link>
        </li>
      </ul>
    </div>

    // <div className="sidebar close">
    //   <div className="logo-details">
    //     {/* <i className="bx bxl-c-plus-plus"></i> */}
    //     <Logo showText={false} />
    //     <span className="logo_name">CodingLab</span>
    //   </div>
    //   <ul className="nav-links">
    //     <li>
    //       <a href="#">
    //         {/* <i className="bx bx-grid-alt"></i> */}
    //         <Svg icon={"lock"} />
    //         <span className="link_name">Dashboard</span>
    //       </a>
    //       <ul className="sub-menu blank">
    //         <li>
    //           <a className="link_name" href="#">
    //             Category
    //           </a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <div className="iocn-link">
    //         <a href="#">
    //           {/* <i className="bx bx-collection"></i> */}
    //           <Svg icon={"lock"} />
    //           <span className="link_name">Category</span>
    //         </a>
    //         {/* <i className="bx bxs-chevron-down arrow"></i> */}
    //         <Svg icon={"lock"} />
    //       </div>
    //       <ul className="sub-menu">
    //         <li>
    //           <a className="link_name" href="#">
    //             Category
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#">HTML & CSS</a>
    //         </li>
    //         <li>
    //           <a href="#">JavaScript</a>
    //         </li>
    //         <li>
    //           <a href="#">PHP & MySQL</a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <div className="iocn-link">
    //         <a href="#">
    //           {/* <i className="bx bx-book-alt"></i> */}
    //           <Svg icon={"lock"} />
    //           <span className="link_name">Posts</span>
    //         </a>
    //         {/* <i className="bx bxs-chevron-down arrow"></i> */}
    //         <Svg icon={"lock"} />
    //       </div>
    //       <ul className="sub-menu">
    //         <li>
    //           <a className="link_name" href="#">
    //             Posts
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#">Web Design</a>
    //         </li>
    //         <li>
    //           <a href="#">Login Form</a>
    //         </li>
    //         <li>
    //           <a href="#">Card Design</a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <a href="#">
    //         {/* <i className="bx bx-pie-chart-alt-2"></i> */}
    //         <Svg icon={"lock"} />
    //         <span className="link_name">Analytics</span>
    //       </a>
    //       <ul className="sub-menu blank">
    //         <li>
    //           <a className="link_name" href="#">
    //             Analytics
    //           </a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <a href="#">
    //         {/* <i className="bx bx-line-chart"></i> */}
    //         <Svg icon={"lock"} />
    //         <span className="link_name">Chart</span>
    //       </a>
    //       <ul className="sub-menu blank">
    //         <li>
    //           <a className="link_name" href="#">
    //             Chart
    //           </a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <div className="iocn-link">
    //         <a href="#">
    //           {/* <i className="bx bx-plug"></i> */}
    //           <Svg icon={"lock"} />
    //           <span className="link_name">Plugins</span>
    //         </a>
    //         {/* <i className="bx bxs-chevron-down arrow"></i> */}
    //         <Svg icon={"lock"} />
    //       </div>
    //       <ul className="sub-menu">
    //         <li>
    //           <a className="link_name" href="#">
    //             Plugins
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#">UI Face</a>
    //         </li>
    //         <li>
    //           <a href="#">Pigments</a>
    //         </li>
    //         <li>
    //           <a href="#">Box Icons</a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <a href="#">
    //         {/* <i className="bx bx-compass"></i> */}
    //         <Svg icon={"lock"} />
    //         <span className="link_name">Explore</span>
    //       </a>
    //       <ul className="sub-menu blank">
    //         <li>
    //           <a className="link_name" href="#">
    //             Explore
    //           </a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <a href="#">
    //         {/* <i className="bx bx-history"></i> */}
    //         <Svg icon={"lock"} />
    //         <span className="link_name">History</span>
    //       </a>
    //       <ul className="sub-menu blank">
    //         <li>
    //           <a className="link_name" href="#">
    //             History
    //           </a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <a href="#">
    //         {/* <i className="bx bx-cog"></i> */}
    //         <Svg icon={"lock"} />
    //         <span className="link_name">Setting</span>
    //       </a>
    //       <ul className="sub-menu blank">
    //         <li>
    //           <a className="link_name" href="#">
    //             Setting
    //           </a>
    //         </li>
    //       </ul>
    //     </li>
    //     <li>
    //       <div className="profile-details">
    //         <div className="profile-content">
    //           {/* <!--<img src="image/profile.jpg" alt="profileImg">--> */}
    //         </div>
    //         <div className="name-job">
    //           <div className="profile_name">Prem Shahi</div>
    //           <div className="job">Web Desginer</div>
    //         </div>
    //         {/* <i className="bx bx-log-out"></i> */}
    //         <Svg icon={"lock"} />
    //       </div>
    //     </li>
    //   </ul>
    // </div>
  );
}
