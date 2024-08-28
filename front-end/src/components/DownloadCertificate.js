import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // You can use pdfkit or jsPDF for generating PDFs

const DownloadCertificate = () => {
  const [batchName, setBatchName] = useState('');
  const [certificateID, setCertificateID] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState('');

  const handleBatchNameChange = (e) => {
    setBatchName(e.target.value);
  };

  const handleCertificateIDChange = (e) => {
    setCertificateID(e.target.value);
  };

  const fetchCertificateData = async () => {
    try {
      const formattedBatchName = batchName.trim().toLowerCase() + 's'; // Pluralize the batch name
      const response = await axios.get(`http://localhost:5000/api/certificate/${formattedBatchName}/${certificateID}`);
      setCertificateData(response.data);
      setError('');
    } catch (err) {
      setError('Error retrieving certificate data. Please ensure the batch name and certificate ID are correct.');
      console.error('Error retrieving certificate data:', err);
    }
  };

  const generatePDF = () => {
    if (!certificateData) {
      setError('No certificate data available to generate PDF.');
      return;
    }

    const { certificateID, studentName, internshipDomain, startDate, endDate } = certificateData;
    const doc = new jsPDF();

    doc.text(`Certificate ID: ${certificateID}`, 10, 10);
    doc.text(`Student Name: ${studentName}`, 10, 20);
    doc.text(`Internship Domain: ${internshipDomain}`, 10, 30);
    doc.text(`Start Date: ${startDate}`, 10, 40);
    doc.text(`End Date: ${endDate}`, 10, 50);
    doc.text(`Completion Certificate`, 10, 60);

    // Save the PDF
    doc.save('certificate.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchCertificateData();
  };

  return (
    <div>
      <h1>Download Certificate</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Batch Name:
          <input
            type="text"
            value={batchName}
            onChange={handleBatchNameChange}
            placeholder="Enter batch name"
            required
          />
        </label>
        <label>
          Certificate ID:
          <input
            type="text"
            value={certificateID}
            onChange={handleCertificateIDChange}
            placeholder="Enter certificate ID"
            required
          />
        </label>
        <button type="submit">Retrieve Certificate</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {certificateData && (
        <div>
          <h2>Certificate Details</h2>
          <p><strong>Certificate ID:</strong> {certificateData.certificateID}</p>
          <p><strong>Student Name:</strong> {certificateData.studentName}</p>
          <p><strong>Internship Domain:</strong> {certificateData.internshipDomain}</p>
          <p><strong>Start Date:</strong> {certificateData.startDate}</p>
          <p><strong>End Date:</strong> {certificateData.endDate}</p>
          <button onClick={generatePDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default DownloadCertificate;
