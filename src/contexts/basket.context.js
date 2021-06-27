import React, { createContext, useReducer } from "react";

const initialState = {
  basket: []
}

const BasketContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state, mutation) => {
  console.log("reduced");
  switch (mutation.type) {
      case "add_book":
        return { ...state, basket: mutation.payload };
      case "empty_basket":
        return { ...state, initialState };
      default:
        return state;
  }
};

const BasketProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <BasketContext.Provider value={{ state, dispatch }}>
            {children}
        </BasketContext.Provider>
    );
};

export { BasketContext, BasketProvider, initialState };
