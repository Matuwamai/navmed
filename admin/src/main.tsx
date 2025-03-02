import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import './index.css'
import Login from './pages/Login'
import Layout from './components/Layout';
import Products from './pages/Products'
import Orders from './pages/Orders'
import Product from './pages/Product'
import Users from './pages/Users'
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/Updateproduct';
import Register from './pages/Admiregister';
import ViewOrderDetails from './components/ViewOrderDetails';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          < Route element={<Layout />} >
            <Route path='/product/:id' element={<Product />} />
            <Route path='/products' element={<Products />} />
            <Route path="/orders/:id/users/:userId" element={<ViewOrderDetails />} />
            <Route path='/product/:id' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/users' element={<Users />} />
            <Route path='/create-admin' element={<Register />} />
            <Route path='/create-product' element={<CreateProduct />} />
            <Route path="/products/update/:id" element={<UpdateProduct />} />

          </Route >
        </Routes>
      </AuthProvider>

    </Router>
  </StrictMode>,
)   