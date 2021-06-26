import React from "react";
import { Link } from "react-router-dom";
import blibrarylogo from '../assets/img/Blibrary.png';
import '../assets/css/components/Header.css';
import Basket from '../assets/img/basket.svg';


const Header = () => {
  return (
    <div className="header-wrapper inline">
      <Link className="inline" to="/">
        <img className="header-logo" src={blibrarylogo} alt="Logo" />
        <p className="header-title" >Blibrary</p>
      </Link>

      <div className="inline bloc-right">
        <p className="text" >Pannier</p>
        <img className="basket-logo" src={Basket} alt="pannier" />
      </div>

    </div>
  );
}

export default Header;