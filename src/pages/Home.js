import React, { useState, useEffect } from "react";
import BookService from "../services/Book.service";
import '../assets/css/Home.css';
import Header from "../components/Header";
import reading from '../assets/img/reading.svg';
import magnifier from '../assets/img/magnifier.svg';
import { Link } from "react-router-dom";

const Home = () => {

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [reserchFilter, setResearchFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await BookService.getBooks();
      setBooks(response);
      setFilteredBooks(books);
    }

    fetchData();
  }, []);




  return (
    <div className="page-container">
      <Header />
      <div className="inline">
        <div>
          <p className="catchphrase"> La librairie toujours ouverte !</p>
          <p className="catchphrase">Trouve ton livre d'Henri Potier au meilleur prix avec nous</p>
          <div className="search inline search-container">
            <input className="search-input" placeholder="Recherche ton livre d'Henri Pottier"></input>
            <Link className="search-button"><img className="search-button" src={magnifier}/></Link>
          </div>
        </div>
        <img className="illustration" src={reading} alt="pannier" />
      </div>

      <div className="inline cards-container">
        {
          books.slice(0,4).map((book)=>{
            return(
              <div className="card">
                <img src={book.cover} className="book-cover" alt={`couverture du livre ${book.title}`}/>
                <p className="text">{book.title}</p>
                <div className="inline price-buy-container">
                  <p className="text price-text">Prix : <span className="price-value">{book.price} €</span></p>
                  <Link className="text button"> Acheter </Link>
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