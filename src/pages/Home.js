import React, { useState, useEffect } from "react";
import BookService from "../services/Book.service";
import '../assets/css/Home.css';
import Header from "../components/Header";
import reading from '../assets/img/reading.svg';

const Home = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await BookService.getBooks();
      setBooks(response)
      console.log(response);
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
        </div>
        <img className="illustration" src={reading} alt="pannier" />
      </div>

      <div className="inline cards-container">
        {books.map((book)=>{
          return(
            <div className="card">
              <img src={book.cover} className="book-cover" alt={`couverture du livre ${book.title}`}/>
              <p>{book.title}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Home