

import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Verify = () => {
  const [batchName, setBatchName] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/verify', {
        params: { batchName, certificateId }
      });
      setResult(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred');
      setResult(null);
    }
  };

  const downloadPDF = async () => {
    if (!result) return;

    const element = document.getElementById('certificate');
    if (!element) {
      setError('Certificate element not found');
      return;
    }
    
    try {
      // Hide the download button
      const button = document.getElementById('download-button');
      if (button) button.style.display = 'none';

      // Convert the certificate content to canvas
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');

      // Create a new jsPDF instance
      const doc = new jsPDF('p', 'pt', 'a4');

      // Add image to PDF
      doc.addImage(imgData, 'PNG', 20, 100, 560, 0);

      // Save the PDF
      doc.save('certificate.pdf');

      // Show the download button again
      if (button) button.style.display = 'block';
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF');
    }
  };
  return (
    <div className='m20'>
      <h2>Verify Certificate</h2>
      <div className='flex' >
        <div className="verifyDiv">
        <label className='inputLabel'>
          Batch Name:
          <input className='inputBox'
            type="text"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
          />
        </label>
     
      
        <label className='inputLabel'>
          Certificate ID:
          <input className='inputBox'
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
          />
        </label>
      
      <button className="appButton" onClick={handleVerify}>Generate Certificate</button>
      </div>
      <img src="https://th.bing.com/th/id/OIG1.mibC1kwQXhUVdxVUwH9g?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="certificate image"/>
      </div>
      {result && (
        <div className='verifyDiv'>
          <button className='appButton' id="download-button" onClick={downloadPDF}>Download as PDF</button>
        <div className="certificate-container" id="certificate">
          
          <div className="certificate-text">
            
            
         
          <p className="certificate-content">
          <p className="certificate-subheader">Certificate ID:{result.certificateId}</p>
          <h1 className="certificate-header">CERTIFICATE  OF COMPLETION  </h1>
          <p>PROUDLY PRESENTED TO <strong>{result.name}</strong> </p>
           who has successfully completed a virtual internship program in <strong> {result.internshipDomain}</strong> domain 
          with wonderful remarks at XYZ Company from<strong> {new Date(result.startDate).toLocaleDateString()} </strong> 
           to  <strong>{new Date(result.endDate).toLocaleDateString()}</strong> 
          
          <p >We were truly amazed by his/her showcased skills and invaluable contributions to the tasks and projects throughout the internship.</p>
          </p>
          
        </div>
        </div>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Verify;
