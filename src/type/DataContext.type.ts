export type ActionType =
  | { type: "SETUP_USER"; payload: {} }
  | { type: "UPDATE_PLAYLISTS"; payload: {} };

export type StateType = {
  watchLaterListId: string;
  historyListId: string;
  likedListId: string;
  playlists: Array<string>;
};

export type DataContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};
