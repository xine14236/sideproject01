import React from 'react';
import Navbar from './components/navbar';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/globals.scss';
import Home from './pages/home';
import Loginp from './pages/login';
import ToDoList from './pages/todo';
import { AuthProvider } from './hooks/use-auth';

function App() {
  return (
    <Router>
    <AuthProvider>
   
        <div>
          <Navbar /> {/* 頁首部分會固定在所有頁面上 */}
          
          {/* 動態切換頁面內容 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Loginp />} />
            <Route path="/todolist" element={<ToDoList />} />
          </Routes>
          
          {/* <Footer /> 頁尾部分會固定在所有頁面上 */}
        </div>
   
    </AuthProvider>
    </Router>
  );
}

export default App;
