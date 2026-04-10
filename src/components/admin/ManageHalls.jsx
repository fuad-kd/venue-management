import React, { useState } from 'react';
import { db, storage } from '../../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ManageHalls = () => {
  const [hallName, setHallName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 4) {
      return alert("Maximum 4 photos allowed.");
    }
    
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);
    setPreviews(newFiles.map(file => URL.createObjectURL(file)));
  };

  // NEW FEATURE: Remove a specific photo
  const removePhoto = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleCreateHall = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert("Please add at least one photo.");
    setLoading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const fileRef = ref(storage, `halls/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      });

      const imageUrls = await Promise.all(uploadPromises);

      await addDoc(collection(db, "halls"), {
        name: hallName,
        capacity: Number(capacity),
        price: Number(price),
        images: imageUrls,
        createdAt: serverTimestamp()
      });

      alert("Hall created successfully!");
      setHallName(""); setCapacity(""); setPrice(""); setSelectedFiles([]); setPreviews([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Visibility Fix for Black Text
  const inputStyle = {
    width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd',
    backgroundColor: '#ffffff', color: '#000000', marginBottom: '15px'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <form onSubmit={handleCreateHall} style={formBoxStyle}>
        <h2 style={{ textAlign: 'center', color: '#1877f2' }}>➕ Add New Hall</h2>
        
        <label style={labelStyle}>Hall Name</label>
        <input style={inputStyle} value={hallName} onChange={(e) => setHallName(e.target.value)} required />

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Capacity</label>
            <input style={inputStyle} value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Price/Slot (TK)</label>
            <input style={inputStyle} value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
        </div>

        {/* PHOTO SECTION WITH CANCEL FEATURE */}
        <div style={uploadAreaStyle}>
          <label style={{ cursor: 'pointer' }}>
            <div style={{ color: '#1877f2', fontWeight: 'bold' }}>📷 Click to Upload from Computer</div>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          
          <div style={previewGridStyle}>
            {previews.map((src, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={src} style={thumbnailStyle} alt="preview" />
                {/* THE CANCEL BUTTON */}
                <button 
                  type="button"
                  onClick={() => removePhoto(i)}
                  style={cancelBtnStyle}
                >
                  ✕
                </button>
                <div style={numberBadge}>{i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} style={loading ? disabledBtn : submitBtn}>
          {loading ? "Uploading..." : "Create Hall"}
        </button>
      </form>
    </div>
  );
};

// --- STYLING ---
const formBoxStyle = { background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' };
const labelStyle = { display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#4a5568' };
const uploadAreaStyle = { border: '2px dashed #1877f2', padding: '20px', borderRadius: '12px', textAlign: 'center', marginTop: '10px' };
const previewGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginTop: '20px' };
const thumbnailStyle = { width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' };

const cancelBtnStyle = {
  position: 'absolute', top: '-5px', right: '-5px',
  backgroundColor: '#ff4d4f', color: 'white', border: 'none',
  borderRadius: '50%', width: '22px', height: '22px',
  cursor: 'pointer', fontSize: '12px', fontWeight: 'bold',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};

const numberBadge = { position: 'absolute', bottom: '5px', left: '5px', background: '#1877f2', color: 'white', padding: '2px 7px', borderRadius: '50%', fontSize: '10px' };
const submitBtn = { width: '100%', padding: '14px', backgroundColor: '#1877f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' };
const disabledBtn = { ...submitBtn, backgroundColor: '#cbd5e0' };

export default ManageHalls;