import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Directory = ({ onSelectHall, selectedId }) => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "halls"));
        const hallData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHalls(hallData);
      } catch (error) {
        console.error("Error fetching halls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  if (loading) return <p>Loading venues from database...</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {halls.map(hall => (
        <div key={hall.id} onClick={() => onSelectHall(hall)} 
             style={{ cursor: 'pointer', background: 'white', borderRadius: '12px', overflow: 'hidden', border: selectedId === hall.id ? '3px solid #007bff' : '1px solid #eee' }}>
          <img src={hall.img} style={{ width: '100%', height: '160px', objectFit: 'cover' }} alt={hall.name} />
          <div style={{ padding: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0' }}>{hall.name}</h4>
            <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: '#666' }}>Capacity: {hall.capacity} People</p>
            <span style={{ color: '#28a745', fontWeight: 'bold' }}>${hall.price}/hr</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Directory;