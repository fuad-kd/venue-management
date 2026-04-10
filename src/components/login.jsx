import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate here

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Remove the alert and navigate instead!
      navigate('/home'); 
    } catch (error) {
      alert(error.message);
    }
  };

  // ... rest of your return() code stays exactly the same

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input 
  type="email" 
  placeholder="Email" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
  autoComplete="email" // This tells the browser to suggest saved emails!
  style={styles.input} // Assuming you have your styles here
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

// Simple CSS-in-JS for styling
const styles = {
  container: { maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }
};

export default Login;
