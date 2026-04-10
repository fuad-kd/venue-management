import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Availability = ({ selectedHall }) => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const checkAvailability = async () => {
    if (!selectedHall || !date) {
      setStatus("⚠️ Please select a hall and a date first.");
      return;
    }

    setStatus("Checking...");
    try {
      const q = query(
        collection(db, "bookings"),
        where("hallId", "==", selectedHall.id),
        where("date", "==", date)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setStatus("❌ Sorry, this date is already booked.");
      } else {
        setStatus("✅ Available! You can proceed to Step 2.");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setStatus("Error checking database.");
    }
  };

  return (
    <div style={{ 
      marginBottom: '25px', 
      paddingBottom: '20px', 
      borderBottom: '1px solid #eee' 
    }}>
      <h4 style={{ color: '#555', marginBottom: '10px' }}>1. Check Availability</h4>
      
      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
        Selected: <strong style={{ color: '#007bff' }}>{selectedHall ? selectedHall.name : "None"}</strong>
      </p>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          style={{ 
            padding: "10px", 
            flex: 1, 
            borderRadius: "6px", 
            border: "1px solid #ddd",
            fontSize: "0.9rem" 
          }}
        />
        <button 
          onClick={checkAvailability}
          style={{ 
            background: "#17a2b8", 
            color: "white", 
            padding: "10px 20px", 
            border: "none", 
            borderRadius: "6px", 
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s"
          }}
          onMouseOver={(e) => e.target.style.background = "#138496"}
          onMouseOut={(e) => e.target.style.background = "#17a2b8"}
        >
          Check
        </button>
      </div>
      
      {status && (
        <p style={{ 
          marginTop: "12px", 
          fontSize: "0.9rem", 
          color: status.includes("✅") ? "#28a745" : "#dc3545",
          fontWeight: "500"
        }}>
          {status}
        </p>
      )}
    </div>
  );
};

export default Availability;