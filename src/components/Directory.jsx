import React from "react";

const Directory = ({ onSelectHall }) => {
  // Mock data for the directory
  const halls = [
    { id: "h1", name: "Grand Skyline Hall", capacity: 500, price: "$100/hr" },
    { id: "h2", name: "Royal Orchid Center", capacity: 300, price: "$75/hr" },
    { id: "h3", name: "Silver Bell Venue", capacity: 150, price: "$50/hr" },
  ];

  const styles = {
    card: { border: "1px solid #ddd", padding: "15px", margin: "10px 0", borderRadius: "8px", backgroundColor: "#fff" },
    btn: { background: "#007bff", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }
  };

  return (
    <div style={{ textAlign: "left", maxWidth: "600px", margin: "auto" }}>
      <h2>🏢 Center Directory</h2>
      {halls.map((hall) => (
        <div key={hall.id} style={styles.card}>
          <h3>{hall.name}</h3>
          <p>Capacity: {hall.capacity} People | Price: {hall.price}</p>
          <button style={styles.btn} onClick={() => onSelectHall(hall)}>
            Select This Hall
          </button>
        </div>
      ))}
    </div>
  );
};

export default Directory;