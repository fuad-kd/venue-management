import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

const QuickBook = ({ selectedHall }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (8AM - 12PM)");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!selectedHall || !bookingDate) {
      alert("Please select a date first!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        hallId: selectedHall.id,
        hallName: selectedHall.name,
        date: bookingDate,
        timeSlot: timeSlot,
        userEmail: auth.currentUser?.email || "student_id_145", // Using your ID as fallback
        status: "Confirmed",
        bookedAt: serverTimestamp(),
      });
      alert("Success! Your slot is reserved.");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // Styles to match image_ab5046.jpg
  const styles = {
    section: {
      marginTop: "20px",
      padding: "20px",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      backgroundColor: "#fff"
    },
    title: { fontSize: "1.2rem", margin: "0 0 15px 0", color: "#333" },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      backgroundColor: "#333", // Dark style like the image
      color: "white",
      fontSize: "1rem"
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      backgroundColor: "#444",
      color: "white",
      cursor: "pointer"
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#28a745", // Green button from your image
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background 0.3s"
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.title}>2. Reserve Your Slot</h3>
      
      {/* Date Picker - Styled dark like your screenshot */}
      <input 
        type="date" 
        style={styles.input} 
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
      />

      {/* Time Selection */}
      <select 
        style={styles.select}
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
      >
        <option>Morning (8AM - 12PM)</option>
        <option>Afternoon (1PM - 5PM)</option>
        <option>Evening (6PM - 11PM)</option>
      </select>

      <button 
        style={styles.button} 
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? "Confirming..." : "Confirm Booking"}
      </button>

      {!selectedHall && (
        <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "10px", textAlign: "center" }}>
          Booking for: Select a hall first
        </p>
      )}
    </div>
  );
};

export default QuickBook;