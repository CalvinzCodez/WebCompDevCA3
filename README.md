# Web Component Development Project Year 4 Semester 1 

App created using react that allows a user to log-in as either a user or administrator. A user can log-in and place and order for books whereas an administrator can add, view, edit and delete book entries in the database. The admin can also add books via a json file.
Books are stored with MongoDB and Express JS.

## Description/Instructions

Instructions:

For this assignment, you are requested to use React and MongoDB to create an app for a small bookstore. The admin of the system should be able to insert, read, update, and delete book details. As a minimum the book details stored should include: title, ISBN, author, book category (fiction, history, children, educational etc.), price and number in stock.
To help admin with book insertions, a facility to add books from a JSON file should be provided.
The system also needs to provide an interface that allows customers to search and buy books. The book searches should be on title, genre and author. Customers may select/view an individual book either by book title or the ISBN before purchasing. Customer should be allowed to buy more than one copy of a book but no more than five copies of a book.
For the app GUI, use features like switching dark/ light backgrounds as used in Tailwindcss.
A GitHub repository has been setup for each student for this CA. Evidence of regular updates must be shown throughout the CA. Failure to commit and pull code on GitHub will result in no marks been awarded.

Marking Scheme:

- Admin CRUD ops 30%
- Updating book stock amounts 10%
- Automatic insertion from file 10%
- Search for book Title/Genre/Author 20%
- Web GUI 30%

> [!NOTE]
> Ensure the latest version of MongoDB Compass is installed

## Quickstart
```bash
cd BookStore_System

npm install
npm start

# A new terminal instance will need to be created
cd src
cd backend
node server.js

Ensure that MongoDB Compass is running and contains a database called bookstore and a collection called books
```

## Login Information
Admin details:
- Username - admin
- Password - adminpassword

User details:
- Username - user
- Password - password

## Images
![MainMenu](https://github.com/user-attachments/assets/e0aa4e6b-c807-4434-ae75-ca5c8ce2183d)
![Login](https://github.com/user-attachments/assets/2b5dca61-8231-4aa3-b040-97dec44b0918)
![Add](https://github.com/user-attachments/assets/3cab6754-7e3a-41c0-8bfd-735defe8eae7)
![Delete](https://github.com/user-attachments/assets/02bccfce-c4f8-4ef5-86b8-c1af8a076e69)
![Edit](https://github.com/user-attachments/assets/bb193815-b568-4063-bbff-5da79f80a885)
![Purchase](https://github.com/user-attachments/assets/3faa2852-99e9-4a81-b7fa-cad709ad15f4)

## Author
Calvin Harvey
