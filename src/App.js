import React from 'react';
import Navbar from './components/navbar';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/globals.scss';
import 'leaflet/dist/leaflet.css';
import Home from './pages/home';
import Loginp from './pages/login';
import ToDoList from './pages/todo';
import MyMap from './pages/map';
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
            <Route path="/map" element={<MyMap />} />
          </Routes>
          
          {/* <Footer /> 頁尾部分會固定在所有頁面上 */}
        </div>
   
    </AuthProvider>
    </Router>
  );
}

export default App;
