import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Location } from "history";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { MiniHeader } from "../../components/Header";
import Button from "../../components/Button";
import Svg from "../../components/Svg";
import { successNotify, errorNotify } from "../../utils/toast";
import { useAuth } from "../../context/AuthProvider";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Too short - should be 4 chars min")
    .max(40, "Too long!")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars min")
    .required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

type ValueTypes = {
  username: string;
  password: string;
};

type RouteStateType = {
  from: string;
};

export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { from: to } = (location.state as RouteStateType) || { from: "/" };

  const [dummyLogin, setDummyLogin] = useState(false);

  const getCustomClass = (
    dirty: boolean,
    isValid: boolean,
    isSubmitting: boolean,
    isValidating: boolean
  ) => {
    if (dummyLogin) return "login-btn";
    if (!(dirty && isValid)) return "login-btn btn--disabled";
    // if (!isValid) return "login-btn btn--disabled";
    else if (isSubmitting) return "login-btn btn--loading";
    else if (isValidating) return "login-btn btn--validating";
    else return "login-btn";
  };

  const toggleVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    // if (state && isLoggedIn) {
    //   navigate(state.from);
    // }
    // if (!state && isLoggedIn) navigate("/");
    if (isLoggedIn) navigate(to);
  }, [isLoggedIn]);

  return (
    <div className="login-page-wrapper page-wrapper">
      <MiniHeader type={"signin"} />
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={login}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          isSubmitting,
          isValidating,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <div className="login-form">
              <div className="login-form__header">Login to your account</div>
              <div className="login-form__header-sub">
                Your own video repository
              </div>
              <Button
                customClass={"dummy-login-btn"}
                variant={"secondary"}
                size={"md"}
                clickHandler={() => {
                  setFieldValue("username", "test", true);
                  // setFieldTouched("username", true);
                  setFieldValue("password", "testing", true);
                  // setFieldTouched("password", true);
                  setDummyLogin(true);
                }}
              >
                Login with dummy account
              </Button>
              <div className="login-form__separator"> &#8213; OR &#8213; </div>
              <Form className={"form"}>
                <div className="form-row">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <Field
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    id="email"
                    className={
                      errors.username && touched.username
                        ? "input-auth input-auth--error"
                        : "input-auth"
                    }
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="username"
                    component="span"
                    className="form-error"
                  />
                </div>
                <div className="form-row">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <div className="pw-input-wrapper">
                    <Field
                      // type="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      name="password"
                      id="password"
                      className={
                        errors.password && touched.password
                          ? "input-auth input-auth--error"
                          : "input-auth"
                      }
                      disabled={isSubmitting}
                    />
                    <Svg
                      customClass="pw-visibility-toggle"
                      icon={showPassword ? "hide" : "show"}
                      clickHandler={toggleVisibility}
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="form-error"
                  />
                </div>
                <Button
                  type={"submit"}
                  customClass={getCustomClass(
                    dirty,
                    isValid,
                    isSubmitting,
                    isValidating
                  )}
                  variant={"primary"}
                  size={"md"}
                  loading={isSubmitting}
                >
                  Login
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
