import React from "react";
import blibrarylogo from '../assets/img/Blibrary.png';
import '../assets/css/components/Header.css';
import Basket from '../assets/img/basket.svg';

const Header = () => {
  return (
    <div className="header-wrapper inline">
      <div className="inline">
        <img className="header-logo" src={blibrarylogo} alt="Logo" />
        <p className="header-title" >Blibrary</p>
      </div>

      <div className="inline bloc-right">
        <p className="text" >Pannier</p>
        <img className="basket-logo" src={Basket} alt="pannier" />
      </div>

    </div>
  );
}

export default Header;