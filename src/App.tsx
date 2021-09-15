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
import Watch from "./pages/WatchPage";
import { SkeletonArticle, SkeletonProfile } from "./components/skeletons";
import Button from "./components/Button";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";

import ReactTooltip from "react-tooltip";
// import Modal from "react-modal";

import { useAuth } from "./context/AuthProvider";
import "./styles/main.scss";

// Modal.setAppElement("#root");

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
          <Route path="/watch" element={<Watch />} />
          <PrivateRoute path="/account" element={<Account />} />
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </div>
  );
}
