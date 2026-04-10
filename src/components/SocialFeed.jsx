import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../firebase';

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ hallName: "", text: "", rating: 5, imageUrl: "" });

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchPosts(); }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Please log in.");
    
    await addDoc(collection(db, "posts"), {
      userEmail: auth.currentUser.email,
      ...formData,
      likes: 0,
      createdAt: serverTimestamp()
    });
    setFormData({ hallName: "", text: "", rating: 5, imageUrl: "" });
    fetchPosts();
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto' }}>
      
      {/* CREATE POST BOX */}
      <div style={postBoxStyle}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <div style={avatarStyle}>{auth.currentUser?.email[0].toUpperCase()}</div>
          <p style={{ fontWeight: 'bold', margin: '8px 0' }}>What's on your mind?</p>
        </div>
        
        <form onSubmit={handlePost}>
          <input 
            placeholder="Venue Name (e.g. Grand Palace)" 
            value={formData.hallName} 
            onChange={(e) => setFormData({...formData, hallName: e.target.value})}
            style={inputStyle} required
          />
          <textarea 
            placeholder="Tell us about your experience..." 
            value={formData.text} 
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            style={{ ...inputStyle, height: '100px', resize: 'none' }} required
          />
          <input 
            placeholder="Paste Photo URL (Optional)" 
            value={formData.imageUrl} 
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            style={inputStyle}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#65676b' }}>Rating: </label>
              <select 
                value={formData.rating} 
                onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                style={selectStyle}
              >
                {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>
            <button type="submit" style={fbButtonStyle}>Post Review</button>
          </div>
        </form>
      </div>

      {/* THE FEED */}
      {posts.map(post => (
        <div key={post.id} style={cardStyle}>
          <div style={{ padding: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={avatarStyle}>{post.userEmail[0].toUpperCase()}</div>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{post.userEmail.split('@')[0]}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#65676b' }}>Reviewed 🏢 {post.hallName}</p>
              </div>
            </div>
            <div style={{ margin: '15px 0', fontSize: '1.2rem', color: '#f1c40f' }}>
              {'★'.repeat(post.rating)}{'☆'.repeat(5 - post.rating)}
            </div>
            <p style={{ color: '#1c1e21', lineHeight: '1.5' }}>{post.text}</p>
          </div>
          
          {post.imageUrl && (
            <img src={post.imageUrl} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} alt="Post" />
          )}

          <div style={{ padding: '10px 15px', borderTop: '1px solid #ebedf0', display: 'flex', gap: '20px' }}>
            <span style={actionLinkStyle}>👍 Like</span>
            <span style={actionLinkStyle}>💬 Comment</span>
            <span style={actionLinkStyle}>↗️ Share</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- STYLING ---
const postBoxStyle = { background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', marginBottom: '20px' };
const cardStyle = { background: 'white', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', marginBottom: '20px', overflow: 'hidden' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f0f2f5', marginBottom: '10px', outline: 'none' };
const fbButtonStyle = { background: '#1877f2', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const avatarStyle = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e4e6eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#050505' };
const selectStyle = { padding: '5px', borderRadius: '5px', border: '1px solid #ddd' };
const actionLinkStyle = { color: '#65676b', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' };

export default SocialFeed;