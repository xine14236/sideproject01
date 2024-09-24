import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/globals.scss'
import Home from './pages/home';


function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* 頁首部分會固定在所有頁面上 */}
        
        {/* 動態切換頁面內容 */}
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
{/* 
        <Footer /> 頁尾部分會固定在所有頁面上 */}
      </div>
    </Router>
  );
}

export default App;