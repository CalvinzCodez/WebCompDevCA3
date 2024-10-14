import '../../dist/output.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { EditBookModal } from './editbookmadal';
import logo from '../../assets/images/logo.png'
import Swal from 'sweetalert2';

export const EditBook = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const openEditModal = (book) => {
        setSelectedBook(book);
    };

    const closeEditModal = () => {
        setSelectedBook(null);
    };

    const saveBook = async (updatedBook) => {
        try {
            await axios.put(`http://localhost:3000/edit/${updatedBook._id}`, updatedBook);
            setBooks(books.map(book => book._id === updatedBook._id ? updatedBook : book));
            closeEditModal();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
            <div className="DeleteBook">
                <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img img src={logo} height={85} onClick={handleLogo} className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bookstore Admin</span>
                        </a>
                        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <Link to="/" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Link>
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
                                        <li><Link to="/AddBook" className="text-gray-700 dark:text-white">Add Book</Link></li>
                                        <li><Link to="/DeleteBook" className="text-gray-700 dark:text-white">Delete Book</Link></li>
                                        <li><Link to="/EditBook" className="text-gray-700 dark:text-white">Edit Book</Link></li>
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
                                    <Link to="/AdminPage" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                                </li>
                                <li className="relative">
                                    <button onClick={toggleDropdown} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Manage Books</button>
                                    {isDropdownOpen && (
                                        <ul className="absolute text-gray-700 pt-1">
                                            <li>
                                                <Link to="/AddBook" className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Add</Link>
                                            </li>
                                            <li>
                                                <Link to="/EditBook" className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Edit</Link>
                                            </li>
                                            <li>
                                                <Link to="/DeleteBook" className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Delete</Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>

                                <li>
                                    <DarkThemeToggle />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="mt-20">
                    <h2 className="text-2xl font-semibold mb-4">Books List</h2>
                    <ul>
                        {books.map(book => (
                            <li key={book._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-2 dark:bg-gray-900">
                                <span className="font-medium text-gray-800 dark:text-white">{book.title} - {book.author}</span>
                                <button onClick={() => openEditModal(book)} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:text-white">Edit</button>
                            </li>
                        ))}
                    </ul>
                </div>
                {selectedBook && (
                    <EditBookModal
                        book={selectedBook}
                        isOpen={!!selectedBook}
                        onClose={closeEditModal}
                        onSave={saveBook}
                    />
                )}
            </div>
        </Flowbite>
    );
};

