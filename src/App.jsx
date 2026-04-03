import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';    
import Register from './components/Register'; 
import Home from './components/Home'; // Add this import!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add the Home route */}
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </Router>
  );
}

export default App;