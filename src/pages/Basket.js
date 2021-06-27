import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BookService from "../services/Book.service";
import { BasketContext } from "../contexts/basket.context";
import '../assets/css/Basket.css';
import trash from '../assets/img/trash.svg';

const Basket = () => {
  const [promotions, setPromotions] = useState([]);
  const {state, dispatch}  = useContext(BasketContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await BookService.getBooksPromotions(state.basket.map(book => book.isbn));
      setPromotions(response);
      console.log('promotions recieved');
    }
    if(state.basket.length != 0)
      fetchData();
  }, []);

  return(
    <div className="page-container">
      <Header />
      <div className="title-delete-container">
        <p className="text">Votre pannier </p>
        <Link className="inline">
          <p className="text">Vider le pannier</p>
          <img className="empty-basket-icon" src={trash} alt="Vider le pannier"/>
        </Link>
      </div>

      {
        state.basket.length === 0 ? 
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
                  <p className="text">Prix unitaire : <span className="price-value">{book.price} €</span></p>
                  <p className="text">Nombre : <span className="price-value">{book.amount}</span></p>
                </div>
              </div>
              <div className="synopsis-container">
                <p className="text">Résumé</p>
                <p>{book.synopsis[0]}</p>
              </div>
            </div>  
          )
        })
      }

      <p className="text">Promotions disponnibles</p>

      {
        
      }
      
    </div>
    
  );
}

export default Basket;