import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import logo from '../../assets/images/logo.png'
import Swal from 'sweetalert2';

export const PurchasePage = () => {
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(0);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const paymentOptions = ['Cash', 'Card'];
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [searchISBN, setSearchISBN] = useState('');


    useEffect(() => {
        axios.get('http://localhost:3000/books')
            .then(response => {
                const filteredBooks = response.data.filter(book =>
                    book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
                    book.ISBN.toString().includes(searchISBN)
                );
                setBooks(filteredBooks);
            })
            .catch(error => console.error('Error fetching books:', error));
    }, [searchTitle, searchISBN]);



    useEffect(() => {
        // Calculate total
        let newTotal = 0;
        Object.values(cart).forEach(item => {
            newTotal += item.price * item.quantity;
        });
        setTotal(newTotal);
    }, [cart]);

    const handleIncrement = (book) => {
        // Check if the book is already in the cart
        const currentQuantityInCart = cart[book._id]?.quantity || 0;

        // Prevent adding more than 5 copies of the same book
        if (currentQuantityInCart >= 5) {
            alert(`You can only purchase a maximum of 5 copies of ${book.title}.`);
            return;
        }

        // Find the book in the books array to get its current stock
        const bookInStock = books.find(b => b._id === book._id);

        // Check if the book's stock is sufficient
        if (bookInStock && (currentQuantityInCart + 1) > bookInStock.stock) {
            alert(`Only ${bookInStock.stock} copies of ${book.title} are available.`);
            return;
        }

        // If stock is sufficient, add the book to the cart
        setCart(prevCart => ({
            ...prevCart,
            [book._id]: {
                title: book.title,
                price: book.price,
                quantity: currentQuantityInCart + 1
            }
        }));
    };


    const handleDecrement = (book) => {
        // Check if the book is in the cart and its quantity is greater than 0
        if (cart[book._id] && cart[book._id].quantity > 0) {
            setCart(prevCart => {
                const newCart = { ...prevCart };

                // Decrement quantity or remove the book from the cart if quantity becomes 0
                if (newCart[book._id].quantity === 1) {
                    delete newCart[book._id];
                } else {
                    newCart[book._id] = {
                        ...newCart[book._id],
                        quantity: newCart[book._id].quantity - 1
                    };
                }

                return newCart;
            });
        }
    };

    // Function to reset the cart
    const handleResetCart = () => {
        setCart({});
        setTotal(0);
    };

    // Function to handle payment option selection
    const handlePaymentOptionChange = (event) => {
        setSelectedPaymentOption(event.target.value);
    };

    const updateBookStock = async () => {
        try {
            for (const [bookId, { quantity }] of Object.entries(cart)) {
                await axios.put(`http://localhost:3000/books/${bookId}/updateStock`, { quantity });
            }
        } catch (error) {
            console.error('Error updating book stock:', error);
        }
    };

    const handleCheckout = async () => {
        if (!selectedPaymentOption) {
            handleShowModal('Please select a payment method.');
            return;
        }

        // Update book stock in the backend
        await updateBookStock();

        handleShowModal(`Payment method selected: ${selectedPaymentOption}\n 
        Your order has been made! \n 
        Your total is: €${total.toFixed(2)}`);
        setCart({}); // Clear the cart
        setTotal(0); // Reset total to 0
        // Optionally, refetch books to update the stock
    };

    const handleShowModal = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    const handleGoToHomepage = () => {
        navigate('/');
    };

    const handleSearch = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/search`, {
                params: {
                    title: searchTitle,
                    ISBN: searchISBN 
                }
            });
            setBooks(response.data);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    }, [searchTitle, searchISBN]);

    useEffect(() => {
        // Debounce search to reduce the number of server requests
        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 500); // Adjust time for debounce as needed

        return () => clearTimeout(timeoutId);
    }, [searchTitle, searchISBN, handleSearch]); // Added handleSearch here

    const handleReset = () => {
        setSearchTitle('');
        setSearchISBN('');
    };

    // Initialize isNavbarOpen as false
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    // Function to toggle the navbar state
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
            <div className="purchasePage">
                <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img img src={logo} height={85} onClick={handleLogo} className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bookstore Customer</span>
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
                                    <DarkThemeToggle />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container mx-auto px-4 md:px-0 max-w-3xl mt-20">
                    <div className="flex justify-center mb-4">
                        <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
                            <div className="flex flex-wrap gap-2">
                                <input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} placeholder="Search by Title" className="border p-2 rounded bg-white shadow rounded-lg p-4 dark:bg-gray-900 dark:text-white" />
                                <input type="text" value={searchISBN} onChange={(e) => setSearchISBN(e.target.value)} placeholder="Search by ISBN" className="border p-2 rounded bg-white shadow rounded-lg p-4 dark:bg-gray-900 dark:text-white" />
                                <button type="button" onClick={handleReset} className="bg-gray-500 text-white p-2 rounded dark:bg-gray-900">Reset</button>
                            </div>
                        </form>
                    </div>
                    <div className="container mx-auto px-4 md:px-0 max-w-3xl mt-20 flex justify-center">
                        <div className="overflow-auto" style={{ maxHeight: '128px' }}> {/* Set a suitable max-height */}
                            <ul>
                                {books.map(book => (
                                    <li key={book._id} className="mb-3">
                                        <div className="bg-white shadow rounded-lg p-4 bg-white shadow rounded-lg p-4 dark:bg-gray-900">
                                            <span className="mr-4 font-medium text-black-800 dark:text-white">{book.title} - {book.ISBN} - ${book.price} - {book.category}</span>
                                            <span className="mr-4 font-medium text-black dark:text-white">
                                                {cart[book._id]?.quantity ? ` (Selected: ${cart[book._id].quantity})` : ''}
                                            </span>
                                            <button onClick={() => handleIncrement(book)} className="bg-green-500 text-white px-2 py-1 rounded mx-1">+</button>
                                            <button onClick={() => handleDecrement(book)} className="bg-red-500 text-white px-2 py-1 rounded mx-1">-</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="font-bold mt-4 flex justify-center">Total: ${total.toFixed(2)}</div>
                    <div className="mt-8 ">
                        <h2 className="text-2xl font-semibold mb-4 flex justify-center">Cart</h2>
                        <div className='flex justify-center'>
                            <div className="overflow-auto " style={{ maxHeight: '128px' }}> {/* Adjust max-height as needed */}
                                {Object.values(cart).map(item => (
                                    <div key={item.title} className="mb-2 bg-white shadow rounded-lg p-4 mr-4 font-medium text-black-800 dark:text-white bg-white shadow rounded-lg p-4 dark:bg-gray-900">
                                        {item.title} - ISBN: {item.ISBN} - Quantity: {item.quantity}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {/* Reset Cart Button */}
                        <button onClick={handleResetCart} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Reset Cart</button>
                    </div>
                    {/* Display total price and payment options */}
                    <div className="paymentOpt mt-4 ">
                        <label className="paymentLabel block mb-2 text-sm font-medium text-gray-700 flex justify-center">Select Payment Method:</label>
                        <div className="flex justify-center mb-4">
                            <div className="flex items-center">
                                {paymentOptions.map((option) => (
                                    <label key={option} className="inline-flex items-center mr-6">
                                        <input type="radio" value={option} checked={selectedPaymentOption === option} onChange={handlePaymentOptionChange} className="form-radio text-blue-600 mr-2" />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={handleCheckout} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Checkout</button>
                            <button onClick={() => navigate("/")} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Logout</button>
                        </div>
                    </div>
                </div>
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 text-center">
                                <p className="text-gray-800 dark:text-gray-300 mb-4">{modalMessage}</p>
                                <button onClick={handleGoToHomepage} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 mx-1">Return to Homepage</button>
                                <button onClick={() => setShowModal(false)} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-700 mx-1">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Flowbite>
    );
}

