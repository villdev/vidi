import React, { useState, createContext, useContext } from "react";
import {
  AuthContextType,
  UserType,
  ValueTypes,
  LoginValueTypes,
} from "../type/AuthContext.type";
import { successNotify, errorNotify } from "../utils/toast";
import axios from "../axios";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const guestUser = {
    id: null,
    username: null,
    email: null,
    avatar: null,
    watchLaterListId: null,
    historyListId: null,
    likedListId: null,
    playlists: null,
  };
  // const getInitialUser = () => {
  //   const loggedInUser = JSON.parse(localStorage.getItem("vidiUser") || "{}");
  //   if (Object.keys(loggedInUser).length === 0) return guestUser;
  //   return loggedInUser;
  // };
  // const getInitialToken = () => {

  //   const token = JSON.parse(localStorage.getItem("vidiToken"));
  // }

  // const [user, setUser] = useState<UserType>(JSON.parse(localStorage.getItem("vidiUser")) || guestUser);
  const [user, setUser] = useState<UserType>(
    JSON.parse(localStorage.getItem("vidiUser")) || guestUser
  );
  // const [token, setToken] = useState<string>(JSON.parse(localStorage.getItem("vidiToken") || ""));
  const [token, setToken] = useState<string>(
    JSON.parse(localStorage.getItem("vidiToken")) || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("vidiToken")
  );

  //! const navigate = useNavigate();

  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }

  axios.interceptors.response.use(undefined, function (error) {
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.data.message === "Invalid Token"
    ) {
      logout();
    }
    return Promise.reject(error);
  });

  const createAccount = async (
    { username, password, email }: ValueTypes,
    { setErrors }: FormikHelpers<ValueTypes>
  ) => {
    try {
      const postBody = {
        username,
        email,
        password,
      };

      const response = await axios.post("/auth/register", postBody);
      if (response.status === 201) {
        const {
          message,
          user: {
            _id,
            username,
            avatar,
            email,
            likedVideos,
            watchLater,
            userHistory,
            playlists,
          },
          token,
        } = response.data;
        localStorage?.setItem("vidiToken", JSON.stringify(token));
        const currentUser = {
          id: _id,
          username: username,
          avatar,
          email,
          watchLaterListId: watchLater,
          historyListId: userHistory,
          likedListId: likedVideos,
          playlists,
        };
        setUser(currentUser);
        localStorage?.setItem("vidiUser", JSON.stringify(currentUser));
        setToken(token);
        setIsLoggedIn(true);
        successNotify(message);
      } else {
        // console.log(response);
        const { message, error } = response.data;
        const isEmailError = error === "email";
        const isUsernameError = error === "username";
        setErrors({
          email: isEmailError ? message : "",
          username: isUsernameError ? message : "",
        });
        // errorNotify("Failure creating account!");
        errorNotify(message);
      }
    } catch (err) {
      // console.error(err);
      // errorNotify("Failure creating account!");
      const { message, error } = err.response.data;
      const isEmailError = error === "email";
      const isUsernameError = error === "username";
      setErrors({
        email: isEmailError ? message : "",
        username: isUsernameError ? message : "",
      });
      // errorNotify("Failure creating account!");
      errorNotify(message);
    }
  };

  const logout = () => {
    setUser(guestUser);
    setToken("");
    setIsLoggedIn(false);
    axios.defaults.headers.common["Authorization"] = null;
    localStorage?.removeItem("vidiUser");
    localStorage?.removeItem("vidiToken");
    successNotify("Logged out successfully");
    // navigate("/");
  };

  const login = async ({ username, password }: LoginValueTypes) =>
    // { setErrors }: FormikHelpers<ValueTypes>
    {
      try {
        const postBody = {
          username,
          password,
        };
        const response = await axios.post("/auth/login", postBody);

        if (response.status === 200) {
          const {
            message,
            user: {
              _id,
              username,
              avatar,
              email,
              likedVideos,
              watchLater,
              userHistory,
              playlists,
            },
            token,
          } = response.data;
          localStorage?.setItem("vidiToken", JSON.stringify(token));
          const currentUser = {
            id: _id,
            username: username,
            avatar,
            email,
            watchLaterListId: watchLater,
            historyListId: userHistory,
            likedListId: likedVideos,
            playlists,
          };
          setUser(currentUser);
          // console.log(currentUser);
          localStorage?.setItem("vidiUser", JSON.stringify(currentUser));
          // console.log(localStorage.getItem("vidiUser"));
          setToken(token);
          setIsLoggedIn(true);
          successNotify(message);
        } else {
          const { message } = response.data;
          errorNotify(message);
        }
      } catch (err) {
        // console.error(err);
        // console.log(err.response);
        const { message } = err.response.data;
        errorNotify(message);
        // errorNotify("Error while loggin in!");
      }
    };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, createAccount, logout, login, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
