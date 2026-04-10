import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Availability = ({ selectedHall }) => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const checkAvailability = async () => {
    if (!selectedHall || !date) {
      setStatus("Please select a hall and a date first.");
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
        setStatus("✅ This date is available!");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setStatus("Error checking database.");
    }
  };

  return (
    <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
      <h3>📅 Check Availability</h3>
      <p>Selected: <strong>{selectedHall ? selectedHall.name : "None"}</strong></p>
      
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "8px", marginRight: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <button 
        onClick={checkAvailability}
        style={{ background: "#17a2b8", color: "white", padding: "9px 15px", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Check
      </button>
      
      {status && <p style={{ marginTop: "15px", fontWeight: "bold" }}>{status}</p>}
    </div>
  );
};

export default Availability;