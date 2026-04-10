import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import ManageHalls from './ManageHalls';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* PROFESSIONAL SIDEBAR */}
      <div style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '30px 20px' }}>
        <h2 style={{ color: '#3182ce', fontSize: '1.5rem', marginBottom: '40px', fontWeight: '800' }}>VenueNetwork <span style={{fontSize: '1rem'}}>Admin</span></h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/admin/halls" style={adminLinkStyle}>🏢 Manage Halls</Link>
          <Link to="/feed" style={adminLinkStyle}>🌐 Public Social Feed</Link>
          <Link to="/home" style={adminLinkStyle}>📅 View as User</Link>
          
          <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
        </nav>
      </div>

      {/* CONTENT AREA */}
      <div style={{ flex: 1, padding: '40px' }}>
        <Routes>
          <Route path="/" element={<ManageHalls />} />
          <Route path="/halls" element={<ManageHalls />} />
        </Routes>
      </div>
    </div>
  );
};

const adminLinkStyle = {
  textDecoration: 'none',
  color: '#4a5568',
  padding: '12px 15px',
  borderRadius: '8px',
  fontWeight: '600',
  transition: '0.2s',
  '&:hover': { backgroundColor: '#edf2f7' }
};

const logoutBtnStyle = {
  marginTop: '50px',
  padding: '12px',
  backgroundColor: '#fff5f5',
  color: '#c53030',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default AdminDashboard;