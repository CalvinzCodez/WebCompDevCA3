import React, { useEffect, useState } from 'react';


function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('/api/books'); // Replace with your API endpoint
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <strong>Title:</strong> {book.title}<br />
            <strong>Author:</strong> {book.author}<br />
            <strong>Category:</strong> {book.category}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
