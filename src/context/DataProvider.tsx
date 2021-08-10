import React, { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "../reducers/dataReducer";
import { DataContextType } from "../type/DataContext.type";

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
