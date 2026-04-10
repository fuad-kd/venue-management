import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import BookingDashboard from './BookingDashboard';
import SocialFeed from './SocialFeed';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' or 'feed'

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* STICKY HEADER - SAME FOR BOTH SIDES */}
      <nav style={navStyle}>
        <div style={navContainer}>
          <div style={{ width: '80px' }}></div> 

          <div style={switchContainerStyle}>
            <button 
              onClick={() => setActiveTab('directory')} 
              style={activeTab === 'directory' ? activeTabStyle : inactiveTabStyle}
            >
              🏢 Venue Directory
            </button>
            <button 
              onClick={() => setActiveTab('feed')} 
              style={activeTab === 'feed' ? activeTabStyle : inactiveTabStyle}
            >
              📱 Social Feed
            </button>
          </div>

          <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
        </div>
      </nav>

      {/* CONTENT AREA - SWITCHES BASED ON TAB */}
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'directory' ? <BookingDashboard /> : <SocialFeed />}
      </main>

    </div>
  );
};

const navStyle = { backgroundColor: '#ffffff', padding: '12px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 1000 };
const navContainer = { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' };
const switchContainerStyle = { display: 'flex', backgroundColor: '#f0f2f5', borderRadius: '12px', padding: '5px', gap: '5px' };
const activeTabStyle = { padding: '10px 24px', backgroundColor: '#ffffff', color: '#1877f2', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '0.95rem', boxShadow: '0 2px 5px rgba(0,0,0,0.08)', cursor: 'pointer' };
const inactiveTabStyle = { padding: '10px 24px', backgroundColor: 'transparent', color: '#65676b', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer' };
const logoutBtnStyle = { backgroundColor: '#fff5f5', color: '#c53030', border: '1px solid #fed7d7', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };

export default Home;