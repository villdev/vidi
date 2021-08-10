import React from "react";
import Logo from "../Logo/index";
import Button from "../Button/index";

import "./header.scss";

export default function MiniHeader({ type }: { type: "signin" | "register" }) {
  return (
    <header className="mini-header-wrapper">
      <Logo showText={true} />

      <div className="mini-header__actions">
        {type === "signin" && (
          <>
            <div className="action__desc">New to Vidi?</div>{" "}
            <Button variant={"secondary"} size={"sm"} to={"/register"}>
              Create an account
            </Button>
          </>
        )}
        {type === "register" && (
          <>
            <div className="action__desc">Have an account already?</div>{" "}
            <Button variant={"secondary"} size={"sm"} to={"/login"}>
              Login instead
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
