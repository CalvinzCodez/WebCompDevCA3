import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import logo from '../../assets/images/logo.png'
import Swal from 'sweetalert2';

export const HomePage = () => {
    const [books, setBooks] = useState([]);

    // Fetch books from the server
    useEffect(() => {
        axios.get('http://localhost:3000/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Function that handles the logo click event
    const handleLogo = () => {
        // Shows a close-up of the company logo
        Swal.fire({
            imageUrl: (logo),
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
        })
    }

    return (
        <Flowbite>
            <div className="homePage">
                <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img img src={logo} height={85} onClick={handleLogo} className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bookstore</span>
                        </a>
                        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <Link to="/LoginPage" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</Link>
                            <button onClick={toggleNavbar} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>

                            {/* Navbar content */}
                            {isNavbarOpen && (
                                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 px-5 mt-1">
                                    <ul className="space-y-4">
                                        <li><Link to="/" className="text-gray-700 dark:text-white">Home</Link></li>
                                        <li><Link to="/SearchPage" className="text-gray-700 dark:text-white">Search</Link></li>
                                        <li>
                                            <DarkThemeToggle />
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link to="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <Link to="/SearchPage" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Search</Link>
                                </li>
                                <li>
                                    <DarkThemeToggle />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container mx-auto mt-20 p-4">
                    <h2 className="text-2xl font-semibold mb-4">Books</h2>
                    <div className="max-h-96 overflow-y-auto">
                        <ul>
                            {books.map(book => (
                                <li key={book._id} className="mb-3">
                                    <div className="bg-white shadow rounded-lg p-4 dark:bg-gray-900">
                                        <h3 className="text-lg font-bold font-medium text-black-800 dark:text-white">{book.title}</h3>
                                        <p className="font-medium text-black-800 dark:text-white">Author: {book.author}</p>
                                        <p className="font-medium text-black-800 dark:text-white">ISBN: {book.ISBN}</p>
                                        <p className="font-medium text-black-800 dark:text-white">Category: {book.category}</p>
                                        <p className="font-medium text-black-800 dark:text-white">Price: € {book.price}</p>
                                        <p className="font-medium text-black-800 dark:text-white">Stock: {book.stock}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Flowbite>
    );
}

