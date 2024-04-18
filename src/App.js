import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import HomeScreen from './components/HomeScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (sessionToken) => {
    setIsLoggedIn(true);
    localStorage.setItem('sessionToken', sessionToken);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sessionToken');
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/"
          element={isLoggedIn ? <HomeScreen onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
