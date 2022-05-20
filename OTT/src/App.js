import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './component/Footer'
import Navbar from './component/Header'
import Home from './pages/Home'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path='/' element={<Home />} />
      {/* <Route path='/' element={<Navigate replace to='/browse' />} />
      <Route exact path='/browse' element={<Home />} /> */}
      {/* <Route path='/' exact render={() => <Navigate to='/browse' />} />
      <Route path='/browse' element={<Home />} /> */}
    </Routes>
    <Footer />
  </BrowserRouter>
)

export default App
