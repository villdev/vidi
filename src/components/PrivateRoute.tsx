import { Route, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";

type PropType = {
  path: string;
  [x: string]: any;
};

export default function PrivateRoute({ path, ...props }: PropType) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
