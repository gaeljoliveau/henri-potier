import React, { createContext, useReducer } from "react";

const initialState = {
  basket: []
}

const BasketContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state, mutation) => {
  console.log(state.basket);
  switch (mutation.type) {
    
      case "add_book":
        let newBook = mutation.payload
        if(!newBook.amount){
          newBook.amount = 1;
        }

        let bookFound = state.basket.find((book) => book.isbn === newBook.isbn)
        if (bookFound){
          console.log('ajout d un exemplaire supplémantaire dans le pannier');

          const book = {...bookFound};
          let newBasket = state.basket.filter((book) => book.isbn !== bookFound.isbn);
          book.amount ++;
          
          return { ...state, basket: [...newBasket, book] }
        }else{
          return { ...state, basket: [...state.basket, newBook] };
        }
        
        
      case "empty_basket":
        console.log('emptying basket');
        return { ...state, basket: [] };
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
