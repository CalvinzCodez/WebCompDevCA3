import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between p-4 md:p-5 dark:bg-gray-800 dark:border-gray-600 lg:block hidden">
            <span className="text-sm text-gray-500 sm:text-center dark:text-white">© 2024 <a href="https://flowbite.com/" className="hover:underline dark:text-white">Calvin's Books™</a>. All Rights Reserved.</span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6 dark:text-white">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6 dark:text-white">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6 dark:text-white">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline dark:text-white ">Contact</a>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
