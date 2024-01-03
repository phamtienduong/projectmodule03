import React, { useState } from 'react'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Main from './components/Layout/Main/Main'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { Routes, Route, Outlet } from "react-router-dom"
// import { Link } from "react-router-dom";
import Products from './pages/Products/Products'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import CartOther from './pages/CartOther/CartOther'
import CheckOut from './pages/CheckOut/CheckOut'
import Bill from './pages/Bill/Bill'
import ProductCategory from './pages/ProductCatergory/ProductCategory'

export default function App() {

  const [isLogin, setIsLogin] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  return (
    <div>
      <Routes>
        <Route path='/' element={ <><Header setIsLoad={setIsLoad} isLogin={isLogin} setIsLogin={setIsLogin} /> <Outlet /> <Footer/></>}>
          <Route path="/" element={<Main />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/products" element={<Products  />}/>
          <Route path="/productDetail/:id" element={<ProductDetail />}/>
          <Route path="/cartOther" element={<CartOther/>}/>
          <Route path="/checkOut" element={<CheckOut/>}/>
          <Route path="/bill" element={<Bill/>}/>
          <Route path="/category" element={<ProductCategory isLoad={isLoad} />}/>

        </Route>
      </Routes>
    </div>
  )
}
