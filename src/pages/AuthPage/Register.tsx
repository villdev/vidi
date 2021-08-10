import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { MiniHeader } from "../../components/Header";
import Button from "../../components/Button";
import Svg from "../../components/Svg";
import { successNotify, errorNotify } from "../../utils/toast";

import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Too short - should be 4 chars min")
    .max(40, "Too long!")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars min")
    .required("Password is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

type ValueTypes = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const { isLoggedIn, createAccount } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getCustomClass = (
    dirty: boolean,
    isValid: boolean,
    isSubmitting: boolean,
    isValidating: boolean
  ) => {
    if (!(dirty && isValid)) return "login-btn btn--disabled";
    else if (isSubmitting) return "login-btn btn--loading";
    else if (isValidating) return "login-btn btn--validating";
    else return "login-btn";
  };

  const toggleVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className="login-page-wrapper page-wrapper">
      <MiniHeader type={"register"} />

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={createAccount}
      >
        {({ errors, touched, isValid, dirty, isSubmitting, isValidating }) => {
          return (
            <div className="login-form">
              <div className="register-form__header">Create your account</div>
              <Form className="form">
                <div className="form-row">
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    id="username"
                    className={
                      errors.username && touched.username
                        ? "input-auth input-auth--error"
                        : "input-auth"
                    }
                  />
                  <ErrorMessage
                    name="username"
                    component="span"
                    className="form-error"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    id="email"
                    className={
                      errors.email && touched.email
                        ? "input-auth input-auth--error"
                        : "input-auth"
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="form-error"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="password">Password</label>
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
                  Register
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
