import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Components
import Login from './components/login';    
import Register from './components/Register'; // Make sure this file exists in your components folder
import Home from './components/Home';
import AdminDashboard from './components/admin/AdminDashboard';
import SocialFeed from './components/SocialFeed';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const adminEmail = "admin@venuenetwork.com"; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading VenueNetwork...</div>;

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={
    user 
      ? (user.email === adminEmail ? <Navigate to="/admin" /> : <Navigate to="/home" />)
      : <Login />
  } />

  {/* 🟢 ADD THIS EXACT LINE RIGHT HERE 🟢 */}
  <Route path="/register" element={<Register />} />

  {/* Your existing home route... */}
  <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
    

        {/* User Protected Routes */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/feed" element={user ? <SocialFeed /> : <Navigate to="/login" />} />

        {/* Admin Protected Routes */}
        <Route path="/admin/*" element={
          user && user.email === adminEmail ? <AdminDashboard /> : <Navigate to="/login" />
        } />

        {/* Catch-all: Redirects unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;