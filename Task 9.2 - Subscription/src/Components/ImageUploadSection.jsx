import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage
import '../CSS/ImageUploadSection.css';

function ImageUploadSection({ setImageUrl }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const storage = getStorage();

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload action
  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file before uploading.');
      return;
    }

    const storageRef = ref(storage, `images/${selectedFile.name}`);
    uploadBytes(storageRef, selectedFile)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setImageUrl(downloadURL); // Pass image URL to parent component
        alert(`Uploaded file: ${selectedFile.name}`);
        setSelectedFile(null); // Clear the file input
        document.getElementById('fileInput').value = '';
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div className="image-upload-container">
      <label>Add an image: </label>
      <input 
        type="text" 
        id="fileNameDisplay" 
        value={selectedFile ? selectedFile.name : ''} 
        readOnly 
        placeholder="No file chosen"
      />
      <input 
        type="file" 
        id="fileInput" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />
      <button type="button" onClick={() => document.getElementById('fileInput').click()}>
        Browse
      </button>
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default ImageUploadSection;
