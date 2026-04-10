import React, { useState } from 'react';
import Directory from './Directory';
import Availability from './Availability';
import QuickBook from './QuickBook';

const BookingDashboard = () => {
  const [selectedHall, setSelectedHall] = useState(null);

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '30px' }}>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        gap: '30px',
        alignItems: 'flex-start' // Keeps the right side from stretching
      }}>
        
        {/* LEFT SIDE: Venue Directory (Takes up more space) */}
        <div style={{ flex: '2', backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0 }}>Venue Directory</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>Select a high-quality venue for your next event.</p>
          <Directory onSelectHall={setSelectedHall} selectedId={selectedHall?.id} />
        </div>

        {/* RIGHT SIDE: Booking Panel (Sticky so it stays visible when scrolling) */}
        <div style={{ flex: '1', position: 'sticky', top: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Card: Availability */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
             
             <Availability selectedHall={selectedHall} />
          </div>

          {/* Bottom Card: Booking */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            
             <QuickBook selectedHall={selectedHall} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingDashboard;