import React, { useState, useEffect } from "react";
import BookService from "../services/Book.service";
import '../assets/css/Home.css';

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
      <p> page d'accueil </p>
    </div>
  );
};

export default Home