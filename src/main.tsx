import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Search from './pages/Search.tsx';
import Saved from './pages/Saved.tsx';
import Messages from './pages/Messages.tsx';
import MyListings from './pages/My-Listings';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-listings" element={<MyListings />} />
      </Routes>
    </Router>
   
  </StrictMode>,
)
