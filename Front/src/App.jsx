// App.jsx
import React, { useState } from 'react';
import Home from './components/home';
import Create from './components/Create';
import Search from './components/Search';
import Cart from './components/Cart';
import Login from './components/Login';
import './App.css'; // Import the updated styles

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      {/* Navigation Bar */}
      <nav className='navbar'>
        <ul className='items'>
          <h3 className='logo'>Sportime</h3>
          <li className='nav-item' onClick={() => setCurrentPage('home')}>Home</li>
          <li className='nav-item' onClick={() => setCurrentPage('search')}>Search</li>
          <li className='nav-item' onClick={() => setCurrentPage('cart')}>Cart</li>
          <li className='nav-item' onClick={() => setCurrentPage('login')}>Login</li>
          <li className='nav-item' onClick={() => setCurrentPage('create')}>Create</li>
        </ul>
      </nav>

      {/* Render different sections based on the current page */}
      {currentPage === 'home' && <Home />}
      {currentPage === 'create' && <Create/>}
      {currentPage === 'search' && <Search />}
      {currentPage === 'cart' && <Cart />}
      {currentPage === 'login' && <Login />}
    </div>
  );
}

export default App;
