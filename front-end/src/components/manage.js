
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CollectionContext } from '../context/CollectionContext';

const Manage = ({ adminName }) => {
  const { collectionName, setCollectionName } = useContext(CollectionContext);
  const auth = JSON.parse(localStorage.getItem('user'));
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [certificateID, setCertificateID] = useState('');
  const [newRowData, setNewRowData] = useState({
    studentName: '',
    internshipDomain: '',
    startDate: '',
    endDate: ''
  });
  const [isViewingFile, setIsViewingFile] = useState(false); // New state to manage view mode

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/manage/files', {
          params: { adminName }
        });
        setFiles(res.data);
      } catch (err) {
        setErrorMessage('Failed to retrieve files');
        console.error('Error fetching files:', err);
      }
    };

    fetchFiles();
  }, [adminName]);

  const viewFile = async (collectionName) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/manage/${collectionName}`);
      console.log('API Response Data:', res.data); // Debug logging
      setSelectedFile(res.data || []); // Set the data or an empty array
      setCollectionName(collectionName); // Set the context collection name
      setCertificateID(''); // Clear any previous certificate ID
      setErrorMessage('');
      setIsViewingFile(true); // Switch to viewing file mode
    } catch (err) {
      setErrorMessage('Error fetching file data');
      console.error('Error fetching file data:', err);
    }
  };

  const updateFile = async () => {
    try {
      console.log('Sending update request:', { certificateID, ...newRowData });
  
      const res = await axios.put(`http://localhost:5000/api/manage/${collectionName}`, { certificateID, ...newRowData });

      console.log('Update response:', res);
  
      if (res.status === 200 && res.data) {
        setUpdateMessage(res.data.message || 'Update succeeded');
        await viewFile(collectionName); // Refresh the file data
      } else {
        setUpdateMessage('Update failed: Unexpected response status or missing data');
      }
    } catch (err) {
      console.error('Error updating file:', err);
  
      if (err.response && err.response.data && err.response.data.message) {
        setUpdateMessage('Update failed: ' + err.response.data.message);
      } else {
        setUpdateMessage('Update failed: ' + (err.message || 'Unknown error'));
      }
    }
  };

  const deleteRow = async (certificateId) => {
    try {
      // Make sure to use the correct endpoint and method
      const res = await axios.delete(`http://localhost:5000/api/manage/${collectionName}/${certificateId}`, {
        data: { certificateId } // This is where the data is sent in the body of the DELETE request
      });
  
      // Update UI after successful deletion
      setUpdateMessage(res.data.message);
      setSelectedFile(null); // Clear the selected file after delete
      await viewFile(collectionName); // Refresh the file data
    } catch (err) {
      // Handle error response
      setUpdateMessage('Delete failed: ' + (err.response?.data.message || 'Unknown error'));
      console.error('Error deleting row:', err);
    }
  };
  

  const deleteCollection = async (collectionName) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/manage/files/${collectionName}`);
      setUpdateMessage(res.data.message);
      setFiles(files.filter(file => file.collectionName !== collectionName)); // Remove from UI
      setSelectedFile([]); // Clear the selected file after delete
      setCollectionName(''); // Clear the collection context
      setIsViewingFile(false); // Return to file list view
    } catch (err) {
      setUpdateMessage('Delete failed: ' + (err.response?.data.message || 'Unknown error'));
      console.error('Error deleting collection:', err);
    }
  };

  const handleBack = () => {
    setIsViewingFile(false); // Return to file list view
    setSelectedFile([]); // Clear selected file data
    setUpdateMessage(''); // Clear update messages
    setCertificateID(''); // Clear the certificate ID
  };

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <h2>Welcome dear {auth.name} !</h2>
      <p>Check the status of your uploaded files below:</p>

      {!isViewingFile ? (
  files
    .filter(file => file.admin === auth.name) // Filtering based on admin name
    .length > 0 ? (
      files
        .filter(file => file.admin === auth.name)
        .map(file => (
          <div key={file._id} className='manageDiv'>
            <h3>{file.collectionName} - ({file.status === 'success' ? 'Success' : 'Failed'})</h3>
            <button className='manageButton' onClick={() => viewFile(file.collectionName)}>View File</button>
            <button className='manageButton' onClick={() => deleteCollection(file.collectionName)}>Delete File</button>
          </div>
        ))
    ) : (
      <div className='noFilesMessage'>
        <p>No files uploaded yet</p>
      </div>
    )
) : (
  <div>
    <h4>{collectionName}
      <button className='manageButton' onClick={handleBack}>Back</button>
    </h4>
    <div className='tableDiv'>
      <table>
        <thead>
          <tr>
            <th>Certificate ID</th>
            <th>Student Name</th>
            <th>Internship Domain</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedFile.map(row => (
            <tr key={row.certificateId}>
              <td>{row.certificateId}</td>
              <td>{row.name}</td>
              <td>{row.internshipDomain}</td>
              <td>{new Date(row.startDate).toLocaleDateString()}</td>
              <td>{new Date(row.endDate).toLocaleDateString()}</td>
              <td>
                <button className='manageButton' onClick={() => setCertificateID(row.certificateId)}>Update</button>
                <button className='manageButton' onClick={() => deleteRow(row.certificateId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {certificateID && (
      <div>
        <h4>Update Certificate</h4>
        <input
          type="text"
          placeholder="Student Name"
          value={newRowData.studentName}
          onChange={(e) => setNewRowData({ ...newRowData, studentName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Internship Domain"
          value={newRowData.internshipDomain}
          onChange={(e) => setNewRowData({ ...newRowData, internshipDomain: e.target.value })}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={newRowData.startDate}
          onChange={(e) => setNewRowData({ ...newRowData, startDate: e.target.value })}
        />
        <input
          type="date"
          placeholder="End Date"
          value={newRowData.endDate}
          onChange={(e) => setNewRowData({ ...newRowData, endDate: e.target.value })}
        />
        <button onClick={updateFile}>Update</button>
      </div>
    )}
  </div>
)}


      {updateMessage && <p>{updateMessage}</p>}
    </div>
  );
};

export default Manage;
