import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Search from './pages/Search/Search.tsx';
import Saved from './pages/Saved/Saved.tsx';
import Messages from './pages/Messages/Messages.tsx';
import MyListings from './pages/My-Listings/My_Listings.tsx';
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
