import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import { isAuthenticated } from './services/authService';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to="/contacts" />} 
          />
          <Route 
            path="/register" 
            element={!isAuth ? <Register /> : <Navigate to="/contacts" />} 
          />
          <Route 
            path="/contacts" 
            element={isAuth ? <Contacts setIsAuth={setIsAuth} /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={isAuth ? "/contacts" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;