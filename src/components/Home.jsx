import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [postText, setPostText] = useState('');
  const navigate = useNavigate();

  // Get the currently logged-in user's email to display
  const currentUser = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    alert("Post feature coming soon! You typed: " + postText);
    setPostText('');
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2>Venue Network</h2>
        <div>
          <span style={{ marginRight: '15px' }}>{currentUser?.email}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      {/* Main Feed Area */}
      <div style={styles.feedContainer}>
        
        {/* Create Post Box */}
        <div style={styles.card}>
          <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <textarea 
              placeholder="Share your experience or review a venue..." 
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              style={styles.textarea}
              rows="3"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button type="button" style={styles.imageBtn}>📷 Add Photo</button>
              <button type="submit" style={styles.postBtn}>Post</button>
            </div>
          </form>
        </div>

        {/* Dummy Post (To show what it will look like) */}
        <div style={styles.card}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>user@example.com</div>
          <p>We just booked the Grand Skyline Hall for our university event! The lighting was amazing. Highly recommend!</p>
          <div style={{ borderTop: '1px solid #eee', marginTop: '15px', paddingTop: '10px', display: 'flex', gap: '15px' }}>
            <button style={styles.actionBtn}>👍 Like (12)</button>
            <button style={styles.actionBtn}>💬 Comment</button>
            <button style={styles.actionBtn}>↗️ Share</button>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
  navbar: { backgroundColor: '#ffffff', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  logoutBtn: { padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  feedContainer: { maxWidth: '600px', margin: '20px auto', padding: '0 10px' },
  card: { backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.2)', marginBottom: '15px' },
  textarea: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none', boxSizing: 'border-box' },
  imageBtn: { padding: '8px 15px', backgroundColor: '#e4e6eb', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  postBtn: { padding: '8px 20px', backgroundColor: '#1877f2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  actionBtn: { background: 'none', border: 'none', color: '#606770', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }
};

export default Home;