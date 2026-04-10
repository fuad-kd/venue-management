import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

const QuickBook = ({ selectedHall }) => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (8AM - 12PM)");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be logged in to book a hall!");
      return;
    }
    if (!selectedHall || !date) {
      alert("Please select a hall and date.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        hallId: selectedHall.id,
        hallName: selectedHall.name,
        date: date,
        timeSlot: timeSlot,
        status: "Confirmed",
        timestamp: serverTimestamp()
      });
      alert("🎉 Booking Confirmed Successfully!");
      setDate(""); // Clear form
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book the hall.");
    }
    setLoading(false);
  };

  const formStyle = { display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" };
  const inputStyle = { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" };

  return (
    <div style={{ background: "#e9ecef", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
      <h3>⚡ Quick Booking</h3>
      <p>Booking for: <strong>{selectedHall ? selectedHall.name : "Select a hall first"}</strong></p>

      <form onSubmit={handleBooking} style={formStyle}>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          style={inputStyle} 
          required 
        />
        
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} style={inputStyle}>
          <option>Morning (8AM - 12PM)</option>
          <option>Afternoon (1PM - 5PM)</option>
          <option>Evening (6PM - 10PM)</option>
        </select>

        <button 
          type="submit" 
          disabled={!selectedHall || loading}
          style={{ background: "#28a745", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default QuickBook;