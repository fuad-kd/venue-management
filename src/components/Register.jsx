import React, { useState } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  // Password Validation Logic (Matches your image requirements)
  const checks = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Ensure all password conditions are green before allowing registration
    if (Object.values(checks).every(Boolean)) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User Data:", {
            uid: userCredential.user.uid,
            phone: phone,
            birthday: dob
        });
        alert("Account Created Successfully!");
      } catch (err) { 
        alert(err.message); 
      }
    } else {
      alert("Please fulfill all password requirements (marked in red).");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '20px' }}>Registration</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        
        {/* Email Field */}
        <input 
          type="email" 
          placeholder="Email" 
          required
          onChange={(e) => setEmail(e.target.value)} 
          style={styles.input} 
        />

        {/* Date of Birth Picker */}
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '12px', color: '#666' }}>Date of Birth</label>
          <input 
            type="date" 
            required
            onChange={(e) => setDob(e.target.value)} 
            style={styles.input} 
          />
        </div>

        {/* Phone Number Field */}
        <input 
          type="tel" 
          placeholder="Phone Number (e.g. 017...)" 
          required
          onChange={(e) => setPhone(e.target.value)} 
          style={styles.input} 
        />

        {/* Password Field */}
        <input 
          type="password" 
          placeholder="Password" 
          required
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input} 
        />
        
        {/* Validation Feedback Section */}
        <div style={styles.validationBox}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Password must contain:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ color: checks.lowercase ? 'green' : 'red' }}>
              {checks.lowercase ? '✓' : '•'} A lowercase letter
            </li>
            <li style={{ color: checks.uppercase ? 'green' : 'red' }}>
              {checks.uppercase ? '✓' : '•'} A capital (uppercase) letter
            </li>
            <li style={{ color: checks.number ? 'green' : 'red' }}>
              {checks.number ? '✓' : '•'} A number
            </li>
            <li style={{ color: checks.length ? 'green' : 'red' }}>
              {checks.length ? '✓' : '•'} Minimum 8 characters
            </li>
          </ul>
        </div>

        <button type="submit" style={styles.button}>Register</button>
      </form>
      
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
      </p>
    </div>
  );
};

const styles = {
    container: { 
      maxWidth: '400px', 
      margin: '40px auto', 
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      textAlign: 'center', 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
    },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { 
      padding: '12px', 
      borderRadius: '5px', 
      border: '1px solid #ccc',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box'
    },
    validationBox: { 
      textAlign: 'left', 
      fontSize: '13px', 
      backgroundColor: '#f9f9f9', 
      padding: '10px', 
      borderRadius: '5px' 
    },
    button: { 
      padding: '12px', 
      backgroundColor: '#28a745', 
      color: 'white', 
      border: 'none', 
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.3s'
    }
};

export default Register;