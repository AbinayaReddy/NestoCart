import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolate from './Chocolate';
import Cart from './Cart';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import NotFound from './NotFound';
import { useSelector } from 'react-redux';
import Vegetables from './Vegetables';
import SignIn from './SignIn';
import FrozenFood from './FrozenFood';
import Orders from './Orders';
import CategoryPage from './CategoryPage';  // <-- Import here
import Products from './Products';

function App() {
  const cartObject = useSelector(globalState => globalState.cart);
  const totalCartCount = cartObject.reduce((totalSum, item) => totalSum + item.quantity, 0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = "/signIn"; // redirect to sign in
  };

  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="logo">🛒 NestoCart</div>
        <nav>
          <ul className="nav-links">
            <li><Link to='/home'>🏠 Home</Link></li>
            {/* You can keep these or remove if you want all category links through /category/:categoryName */}
            <li><Link to='/category/vegetables'>🥕 Vegetables</Link></li>
            <li><Link to='/category/frozenfood'>❄️ Frozen Foods</Link></li>
            <li><Link to='/category/nonveg'>🍗 NonVeg</Link></li>
            <li><Link to='/category/milk'>🥛 Milk</Link></li>
            <li><Link to='/category/chocolate'>🍫 Chocolate</Link></li>
            <li><Link to='/orders'>📦 Orders</Link></li>
            <li>
              <Link to='/cart'>
                🛒 Cart <span className="cart-count">{totalCartCount}</span>
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00b207', fontWeight: 'bold' }}
                >
                  👋 Logout
                </button>
              ) : (
                <Link to="/signIn">🔐 Sign In</Link>
              )}
            </li>
            <li><Link to='/aboutus'>ℹ️ About Us</Link></li>
            <li><Link to='/contactus'>📞 Contact Us</Link></li>
          </ul>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/category/:categoryName' element={<CategoryPage />} />  {/* Dynamic Category Route */}
          <Route path='/frozenfood' element={<FrozenFood />} />
          <Route path='/nonveg' element={<NonVeg />} />
          <Route path='/milk' element={<Milk />} />
          <Route path='/chocolate' element={<Chocolate />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/products' element={<Products />} />
          <Route path='/*' element={<NotFound />} />
          
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
