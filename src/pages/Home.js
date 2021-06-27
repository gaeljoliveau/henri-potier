import React, { useState, useEffect, useContext } from "react";
import BookService from "../services/Book.service";
import '../assets/css/Home.css';
import Header from "../components/Header";
import reading from '../assets/img/reading.svg';
import magnifier from '../assets/img/magnifier.svg';
import { Link } from "react-router-dom";
import { BasketContext, initialState } from "../contexts/basket.context";

const Home = () => {

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState([]);
  const {state, dispatch}  = useContext(BasketContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await BookService.getBooks();
      setBooks(response);
      setFilteredBooks(response);
      console.log('response recieved');
    }

    fetchData();
  }, []);

  const addToBasket = (bookisbn) => {
    console.log(bookisbn);
    dispatch({
      type: "add_book",
      payload: [bookisbn]
    })
    console.log(state.basket);
  }

  const editFilter = (newFilter) => {
    console.log(newFilter);
    setFilter(newFilter)
  }

  const searchBooks = () => {
    console.log('searched \'' + filter +'\'');
    setFilteredBooks(books.filter((book) => {
      return(book.title.toLowerCase().includes(filter.toLowerCase()));
    }));
    console.log(filteredBooks.length);
  }

  return (
    <div className="page-container">
      <Header />
      <div className="inline">
        <div>
          <p className="catchphrase"> La librairie toujours ouverte !</p>
          <p className="catchphrase">Trouve ton livre d'Henri Potier au meilleur prix avec nous</p>
          <div className="search inline search-container">
            <input className="search-input" placeholder="Recherche ton livre d'Henri Pottier" onChange={(e) => editFilter(e.target.value)}></input>
            <Link className="search-button" to='' onClick={searchBooks}><img className="search-button" src={magnifier}/></Link>
          </div>
        </div>
        <img className="illustration" src={reading} alt="pannier" />
      </div>

      <div className="cards-container">
        {
          filteredBooks.map((book)=>{
            return(
              <div key={book.isbn} className="card">
                <img src={book.cover} className="book-cover" alt={`couverture du livre ${book.title}`}/>
                <p className="text">{book.title}</p>
                <div className="inline price-buy-container">
                  <p className="text price-text">Prix : <span className="price-value">{book.price} €</span></p>
                  <Link id={book.isbn} className="text button" onClick={(e) => addToBasket(e.target.id)}> Acheter </Link>
                </div>
                
              </div>
              
            );
          })
        }
      </div>

    </div>
  );
};

export default Home