// src/components/FileUpload.js

import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { CollectionContext } from '../context/CollectionContext';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [inputCollectionName, setInputCollectionName] = useState('');
  const { setCollectionName } = useContext(CollectionContext);
  const auth = JSON.parse(localStorage.getItem('user'));
  const [adminName, setAdminName] = useState(auth?.name || '');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const fileInputRef = useRef(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setIsFileUploaded(false);
  };

  const onCollectionNameChange = (e) => {
    setInputCollectionName(e.target.value);
  };

  const onCancelUpload = () => {
    setFile(null);
    setInputCollectionName('');
    setMessage('');
    setIsFileUploaded(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    if (!inputCollectionName) {
      setMessage('Please provide a name for the file collection.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('collectionName', inputCollectionName);
    formData.append('admin',adminName);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(res.data.message);

      if (res.data.success) {
        setCollectionName(inputCollectionName);
        setIsFileUploaded(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage(error.response?.data.message || 'Error uploading file');
    }
  };

  return (
    <div>
      
      <h2>Upload Excel File</h2>
      <div className='uploadDiv '>
        <label htmlfor="name">File Name:</label>
      <input className='inputBox' id="name"
        type="text"
        placeholder="Enter file name"
        value={inputCollectionName}
        onChange={onCollectionNameChange}
        disabled={!file}
      />
      <button className='uploadButton' onClick={onFileUpload} disabled={!file || !inputCollectionName}>Upload</button>
      <button className='uploadButton' onClick={onCancelUpload} disabled={!file}>Cancel</button>
      {message && <p>{message}</p>}
      </div>

      <div className='uploadDiv'>
      <input className= "upload" id="uploadBox"
      
        type="file"
        accept=".xlsx"
        onChange={onFileChange}
        ref={fileInputRef}
        
      />
      

      </div>
    </div>
  );
};

export default FileUpload;
