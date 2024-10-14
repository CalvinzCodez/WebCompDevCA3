import React from 'react';
import './dist/output.css'
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/screens/homepage';
import { LoginPage } from './components/screens/loginpage';
import { AdminPage } from './components/screens/adminPage';
import { PurchasePage } from './components/screens/purchasepage'
import { AddBook } from './components/screens/addbook';
import { DeleteBook } from './components/screens/deletebook';
import { EditBook } from './components/screens/editbook';
import { EditBookModal } from './components/screens/editbookmadal';
import { SearchPage } from './components/screens/searchpage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/PurchasePage" element={<PurchasePage />} />
        <Route path="/AddBook" element={<AddBook />} />
        <Route path="/DeleteBook" element={<DeleteBook />} />
        <Route path="/EditBook" element={<EditBook />} />
        <Route path="/EditBookModal" element={<EditBookModal />} />
        <Route path="/SearchPage" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
