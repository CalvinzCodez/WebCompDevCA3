import React, { useState, useEffect } from 'react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

export const EditBookModal = ({ book, isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState(book.title);
    const [ISBN, setISBN] = useState(book.ISBN);
    const [author, setAuthor] = useState(book.author);
    const [category, setCategory] = useState(book.category);
    const [price, setPrice] = useState(book.price);
    const [stock, setStock] = useState(book.stock);

    useEffect(() => {
        // Update the state when the selected book changes
        setTitle(book.title);
        setISBN(book.ISBN);
        setAuthor(book.author);
        setCategory(book.category);
        setPrice(book.price);
        setStock(book.stock);
    }, [book]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...book,
            title,
            ISBN: parseInt(ISBN, 10),
            author,
            category,
            // Convert price and stock to integers
            price: parseFloat(price),
            stock: parseInt(stock, 10)
        }); // Include other fields in the object
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Flowbite>
            <div className="modal">
                <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="title" id="title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">Title</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="number" name="ISBN" id="ISBN" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={ISBN} onChange={(e) => setISBN(e.target.value)} />
                        <label for="ISBN" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ISBN</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="author" id="author" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="category" id="category" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-grey dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={category} onChange={(e) => setCategory(e.target.value)} />
                            <label for="category" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
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
                    <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Save</button>
                    <button onClick={onClose} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Close</button>
                </form>
            </div>
        </Flowbite>
    );
};
