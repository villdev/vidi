import { StateType, ActionType } from "../type/DataContext.type";

export const initialState: StateType = {
  watchLaterListId: "",
  historyListId: "",
  likedListId: "",
  playlists: [],
};

export const authReducer = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "SETUP_USER":
      // DO SOMETHING
      return state;

    case "UPDATE_PLAYLISTS":
      // DO SOMETHING
      return state;

    default:
      return state;
  }
};
