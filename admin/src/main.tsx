import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './index.css'
import Login from './pages/Login'
import Layout from './components/Layout';
import Products from './pages/Products'
import Orders from './pages/Orders'
import Order from './pages/Order'
import Product from './pages/Product'
import Users from './pages/Users'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Router>
    <Routes>
    <Route path='/login' element={<Login />} />
    < Route  element={<Layout />} > 
    <Route path='/product/:id' element={<Product />} />
    <Route path='/product' element={<Products />} />
    <Route path='/product/:id' element={<Products />} />
    <Route path='/order/:id' element={<Order />} />
    <Route path='/orders' element={<Orders />} />
    <Route path='/' element={<Users/>} />
    </Route >
    
    </Routes>
  </Router>
  </StrictMode>,
)
