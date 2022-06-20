import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './component/Footer'
import Navbar from './component/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Search from './pages/Search'

// BrowserRouter : HTML5를 지원하는 브라우저 주소 감지를 위해 BrowserRouter 사용
// NavBar : 내비게이션 바(헤더)
// Home : 기본 페이지 컴포넌트
// Search : 검색 기능을 사용할 시 사용되는 컴포넌트
// NotFound : 정상적인 주소가 아닐 경우 사용되는 컴포넌트
// Footer : 푸터
const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
)

export default App