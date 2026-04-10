import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          autoComplete="email" 
          style={styles.input} 
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password} // Keeps the input controlled
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {/* FIXED: Changed to lowercase /register so your link works */}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

// I restored your EXACT original styles here
const styles = {
  container: { maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  // Only added color: '#000' and background: '#fff' to stop the text from turning white
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#ffffff', color: '#000000' },
  button: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }
};

export default Login;