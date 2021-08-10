import { FormikHelpers } from "formik";

export type UserType = {
  id: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  watchLaterListId: string | null;
  historyListId: string | null;
  likedListId: string | null;
  playlists: Array<string> | null;
};

export type ValueTypes = {
  username: string;
  email: string;
  password: string;
};
export type LoginValueTypes = {
  username: string;
  password: string;
};

export type AuthContextType = {
  user: UserType;
  isLoggedIn: boolean;
  createAccount: (
    { username, password, email }: ValueTypes,
    { setErrors }: FormikHelpers<ValueTypes>
  ) => Promise<void>;
  logout: () => void;
  login: ({ username, password }: LoginValueTypes) => Promise<void>;
  token: string;
};
