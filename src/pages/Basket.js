import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BookService from "../services/Book.service";
import { BasketContext } from "../contexts/basket.context";
import '../assets/css/Basket.css';
import trash from '../assets/img/trash.svg';

const Basket = () => {
  const [promotions, setPromotions] = useState([]);
  const [basketAmount, setBasketAmount] = useState(0);
  const {state, dispatch}  = useContext(BasketContext);

  useEffect(() => {
    setBasketAmount(state.basket.reduce((tot, book)=> (tot + book.price * book.amount),0))
  }, []);

  useEffect(()=> {
    const fetchData = async () => {
      let response = await BookService.getBooksPromotions(state.basket.map(book => book.isbn));
      setPromotions(response.offers.map((promotion) =>  ({...promotion, reductionAmount : calculateReductionAmount(promotion)}) ));
      console.log(promotions);
    }
    
    if(state.basket.length !== 0 && basketAmount !==0)
      fetchData();
  }, [basketAmount])

  const calculateReductionAmount = (promotion) => {
    console.log(promotion, basketAmount);
    switch (promotion.type) {
      case "percentage": 
        return(promotion.value / 100 * basketAmount);
      case "minus":
        return(promotion.value)
      case "slice":
        return(~~(basketAmount / promotion.sliceValue ) * promotion.value)
      default :
        return(0)
    }
  }

  const getBestPromotion = () =>{
    const max = promotions.reduce(function(prev, current) {
      return (prev.reductionAmount > current.reductionAmount) ? prev : current
    })
    console.log(max);
    return max;
  }

  const showBestPromotion = () => {
    const best = getBestPromotion()
    switch(best.type) {
      case "percentage": 
        return(<p>{best.value}% de réduction sur votre pannier soit {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(best.reductionAmount)}</p>)
      case "minus":
        return(<p>{best.value}€ de réduction sur votre pannier</p>)
      case "slice":
        return(<p>{best.value}€ offerts par tanche de {best.sliceValue}€ d'achats soit {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(best.reductionAmount)}</p>)
      default :
        return(<p>type de promotion inconnu : {best.type}</p>)
    }
  }

  return(
    <div className="page-container">
      <Header />
      <div className="title-delete-container">
        <p className="text">Votre pannier </p>
        <p className="text">Montant : <span className="value-number">{basketAmount}€</span></p>
        <Link className="inline" onClick={() => {
              setPromotions([]);
              setBasketAmount(0);
              dispatch({type: "empty_basket"})
            }}>
          <p className="text">Vider le pannier</p>
          <img className="empty-basket-icon" src={trash} alt="Vider le pannier"/>
        </Link>
      </div>

      {
        state.basket.length == 0 ? 
          <div className="book-basket-container" > 
            <p className="text">Votre pannier est vide</p>
          </div>
         :state.basket.map((book) => {
          return(
            <div className="book-basket-container" key={book.isbn}>
              <div className="inline">
                <img src={book.cover} className="book-cover" alt={`couverture du livre ${book.title}`}/>
                <div className="book-info-container">
                  <p className="text">{book.title}</p>
                  <p className="text">Prix unitaire : <span className="value-number">{book.price} €</span></p>
                  <p className="text">Nombre : <span className="value-number">{book.amount}</span></p>
                </div>
              </div>
              <div className="synopsis-container">
                <p className="text">Résumé</p>
                <p className="sub-text">{book.synopsis[0]}</p>
              </div>
            </div>  
          )
        })
      }

      <p className="text promotions-title">Promotions</p>
      <div className="promotions-container">
        <div className="promotions-list-container">
          <p className="text">Promotions disponible :</p>
          {
            promotions.length === 0 ?
              <p className="sub-text">Pas de promotion disponnible car votre pannier est vide</p>
            :promotions.map((promotion, index) => {
              switch (promotion.type) {
                case "percentage": 
                  return(<p className="sub-text" key={'promotion'+index}>{promotion.value}% de réduction sur votre pannier soit {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(promotion.reductionAmount)}</p>)
                case "minus":
                  return(<p className="sub-text" key={'promotion'+index}>{promotion.value}€ de réduction sur votre pannier</p>)
                case "slice":
                  return(<p className="sub-text" key={'promotion'+index}>{promotion.value}€ offerts par tanche de {promotion.sliceValue}€ d'achats soit {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(promotion.reductionAmount)}</p>)
                default :
                  return(<p className="sub-text" key={'promotion'+index}>type de promotion inconnu : {promotion.type}</p>)
              }
            })
          }
        </div>
        {
            promotions.length === 0 ? null :
            <div className="best-promotion-container">
              <p className="text">Meilleure promotion disponible</p>
              <p className="sub-text"> {showBestPromotion() } </p>
              <p className="sub-text">Montant du pannier après réduction : { new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(basketAmount - getBestPromotion().reductionAmount)}</p>
            </div>
          }
      </div>
      
    </div>
    
  );
}

export default Basket;