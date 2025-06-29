
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Summaries from './pages/Summaries';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:name" element={<CategoryPage />} />
      <Route path="/summaries" element={<Summaries />} />
    </Routes>
  </Router>
);

export default App;