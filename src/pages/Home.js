import React, { useState, useEffect } from "react";
import BookService from "../services/Book.service";
import '../assets/css/Home.css';
import Header from "../components/Header";

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
      <p>La librairie toujour ouverte !</p>
      <p>Trouve ton livre d'Henri Potier avec nous</p>
    </div>
  );
};

export default Home