import React, { useReducer } from "react";
import Context from "./Context";
import Reducer from "./Reducer";

export default function MainProvider(props) {
  const [details, dispatchDetails] = useReducer(Reducer, null);

  return (
    <Context.Provider
      value={{
        details,
        dispatchDetails,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
