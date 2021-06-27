import React, {useContext} from "react";
import { Link } from "react-router-dom";
import blibrarylogo from '../assets/img/Blibrary.png';
import '../assets/css/components/Header.css';
import Basket from '../assets/img/basket.svg';

import { BasketContext } from "../contexts/basket.context";


const Header = () => {

  const {state, dispatch}  = useContext(BasketContext);

  return (
    <div className="header-wrapper inline">
      <Link className="inline" to="/">
        <img className="header-logo" src={blibrarylogo} alt="Logo" />
        <p className="header-title" >Blibrary</p>
      </Link>

      <Link className="inline bloc-right" to='/basket'>
        <p className="text" >Pannier {state.basket.reduce((tot, book)=> (tot + book.amount),0)}</p>
        <img className="basket-logo" src={Basket} alt="pannier" />
      </Link>

    </div>
  );
}

export default Header;