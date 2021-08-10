import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Login, Register } from "./pages/AuthPage";
import Home from "./pages/HomePage";
import { SkeletonArticle, SkeletonProfile } from "./components/skeletons";
import Button from "./components/Button";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";

import ReactTooltip from "react-tooltip";

import { useAuth } from "./context/AuthProvider";
import "./styles/main.scss";

const Account = () => {
  const {
    user: { email, username },
    logout,
  } = useAuth();

  return (
    <div className="container">
      <h1>Account</h1>
      <h1>{email}</h1>
      <h2>{username}</h2>
      <Button variant="secondary" clickHandler={logout}>
        Logout
      </Button>
    </div>
  );
};

export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <PrivateRoute path="/account" element={<Account />} />
        </Routes>
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <Logo />
        <div className="temp">
          <Button type={"primary"} size={"md"} to={"/test"}>
            Primary Button
          </Button>
          <Button type={"secondary"} size={"md"} to={"/test"}>
            Secondary Button
          </Button>
          <Button type={"link"} size={"md"} to={"/test"}>
            Link button
          </Button>
        </div> */}
        {/* <SkeletonArticle theme={"dark"} /> */}
      </Router>
      <Toaster position="bottom-center" />
    </div>
  );
}
