'use client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import logo from '../../assets/images/logo.png'
import Swal from 'sweetalert2';

export const LoginPage = () => {

  // State to store user credentials
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
      navigate('/PurchasePage');
    } else if (username === 'admin' && password === 'adminpassword') {
      setLoggedIn(true);
      navigate('/AdminPage');
    } else {
      alert('Invalid credentials. Please try again.');
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
        <div className="mt-20">
          <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-grey">Your email</label>
              <input type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={credentials.username} onChange={handleInputChange} placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-grey">Your password</label>
              <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={credentials.password} onChange={handleInputChange} required />
            </div>
            <div className="flex items-start mb-5">
            </div>
            <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Submit</button>
            <Link to="/" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Cancel</Link>
          </form>
        </div>
      </div>
    </Flowbite>
  );
}
