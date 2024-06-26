import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const addBook = (title, author, cover) => {
    const newBook = { id: Date.now().toString(), title, author, cover, status: 'To Be Read' };
    setBooks([...books, newBook]);
  };

  const moveBook = (id, status) => {
    setBooks(
      books.map(book =>
        book.id === id ? { ...book, status } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, moveBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};
