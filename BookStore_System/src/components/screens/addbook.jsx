import '../../dist/output.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import logo from '../../assets/images/logo.png'
import Swal from 'sweetalert2';

export const AddBook = () => {
    const [title, setTitle] = useState('');
    const [ISBN, setISBN] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Fiction'); // Default category
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [existingBooks, setExistingBooks] = useState([]);
    const [message, setMessage] = useState('');

    // Book categories
    const bookCategories = [
        'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Mystery',
        'Thriller', 'Horror', 'Romance', 'Historical Fiction', 'Young Adult',
        'Children\'s Fiction', 'Memoir', 'Biography', 'Self-Help', 'Health & Fitness',
        'Travel', 'Cooking', 'Art & Photography', 'Personal Development', 'True Crime'
    ];

    useEffect(() => {
        axios.get('http://localhost:3000/books')
            .then(response => setExistingBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const bookAlreadyExists = (newBook) => {
        return existingBooks.some(book =>
            book.title === newBook.title || book.ISBN === newBook.ISBN
        );
    };

    const clearForm = () => {
        setTitle('');
        setISBN('');
        setAuthor('');
        setCategory('');
        setPrice('');
        setStock('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBookData = {
            title,
            ISBN: parseInt(ISBN, 10),
            author,
            category,
            price: parseFloat(price),
            stock: parseInt(stock, 10)
        };

        if (bookAlreadyExists(newBookData)) {
            alert('A book with the same title or ISBN already exists.');
            return;
        }

        axios.post('http://localhost:3000/add', newBookData)
            .then(() => {
                setMessage('Book added successfully!');
                clearForm();
                // Optionally, refetch existing books to update the list
            })
            .catch(error => {
                console.error(error);
                setMessage('Error adding the book. Please try again.');
            });
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // State to store the selected file
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const isValidBookData = (data) => {
        // Define the required fields and their expected types
        const requiredFields = {
            title: 'string',
            ISBN: 'number',
            author: 'string',
            category: 'string',
            price: 'number',
            stock: 'number'
        };

        for (const field of Object.keys(requiredFields)) {
            if (!data.hasOwnProperty(field) || typeof data[field] !== requiredFields[field]) {
                return false; // Field missing or wrong type
            }
        }
        return true;
    };

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsText(selectedFile, "UTF-8");
            reader.onload = async (e) => {
                try {
                    const content = JSON.parse(e.target.result);
                    if (Array.isArray(content)) {
                        const promises = content.map(async (book) => {
                            if (isValidBookData(book) && !bookAlreadyExists(book)) {
                                return axios.post('http://localhost:3000/add', book);
                            } else {
                                console.log(`Skipping book: ${book.title} (invalid data or already exists)`);
                                return Promise.resolve();
                            }
                        });

                        await Promise.all(promises);
                        alert('Books added successfully');
                        clearForm();
                    } else {
                        alert('Invalid file format: Expected an array of books');
                    }
                } catch (error) {
                    console.error('Error processing file:', error);
                    alert('Error processing file');
                }
            };
        }
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
            <div className="AddBook">
                <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img img src={logo} height={85} onClick={handleLogo} className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bookstore Admin</span>
                        </a>
                        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <Link to="/" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Link>
                            <button onClick={toggleNavbar} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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
                    {message && <div className="alert-message">{message}</div>}
                    <form class="max-w-md mx-auto" action="/AddBookSubmit" onSubmit={handleSubmit}>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="title" id="title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number" name="ISBN" id="ISBN" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={ISBN} onChange={(e) => setISBN(e.target.value)} />
                            <label for="ISBN" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ISBN</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="author" id="author" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={author} onChange={(e) => setAuthor(e.target.value)} />
                            <label for="author" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <select name="category" id="category" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {bookCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <label htmlFor="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="number" name="price" id="price" min="0" max="30" step="0.25" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={price} onChange={(e) => setPrice(e.target.value)} />
                                <label for="price" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="number" max='20' min='1' step='1' name="stock" id="stock" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value={stock} onChange={(e) => setStock(e.target.value)} />
                                <label for="stock" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stock</label>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Submit</button>
                        <Link to="/AdminPage" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Cancel</Link>
                    </form>
                    <div className="mt-20">
                        <form class="max-w-md mx-auto" onSubmit={handleFileSubmit}>
                            <input type="file" onChange={handleFileChange} accept=".json" />
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload JSON File</button>
                        </form>
                    </div>
                </div>

            </div>
        </Flowbite>
    );
}

