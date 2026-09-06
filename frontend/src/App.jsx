import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import {AuthProvider}from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import OrdersPage from './pages/Orders'
import ProductDetails from './pages/ProductDetails';





const App = () => {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        
          <div className="min-h-screen bg-slate-50 flex flex-col">
            <NavBar/>
            <main className='flex-1'>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/orders" element={<OrdersPage/>}/>
                  <Route path="/adminDashboard" element={
                    <ProtectedRoute requriedAdmin={true}>
                      <AdminDashboard/>
                    </ProtectedRoute>
                    }/>
                  
              </Routes>
            </main>
            <Footer/>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
   
    </>
    
  )
}

export default App