// Scsc.js
import React, { useState } from 'react';
import axios from 'axios';
import './Scsc.css'; // Import a CSS file for styling

const Scsc = () => {
  const [formData, setFormData] = useState({
    ncrp: '',
    dateOfFraud: '',
    victimName: '',
    totalAmountLost: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event) => {
    const date = event.target.value || event;

    if (date && typeof date === 'object' && date instanceof Date) {
      setFormData({ ...formData, dateOfFraud: date });
    } else if (date && typeof date === 'string') {
      const parsedDate = new Date(date);
      setFormData({ ...formData, dateOfFraud: parsedDate });
    } else {
      console.error('Invalid date:', date);
    }
  };

  const handleSubmit = async () => {
    const { ncrp, dateOfFraud, victimName, totalAmountLost } = formData;

    if (ncrp === '' || dateOfFraud === '' || victimName === '' || totalAmountLost === '') {
      alert('All fields are required');
    } else {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post('http://localhost:5000/todos', {
          ncrp,
          dateOfFraud: dateOfFraud.toISOString().split('T')[0],
          victimName,
          totalAmountLost,
        });

        alert('Data entered successfully');
        setFormData({
          ncrp: '',
          dateOfFraud: '',
          victimName: '',
          totalAmountLost: '',
        });
      } catch (error) {
        alert(`Error due to: ${error.message}`);
      }
    }
  };

  return (
    <div className="scsc-container">
      <div className="scsc-header">
        <img src="/scsc1.png" alt="Logo" className="logo" /> {/* Replace with your logo path */}
        <h1>FedEX Database</h1>
      </div>

      <div className="scsc-form">
        <label>NCRP Acknowledgement Number</label>
        <input type="text" name="ncrp" value={formData.ncrp} onChange={handleChange} />

        <label>Date of Fraud</label>
        <input
          type="date"
          name="dateOfFraud"
          value={formData.dateOfFraud ? formData.dateOfFraud.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
        />

        <label>Victim Name</label>
        <input type="text" name="victimName" value={formData.victimName} onChange={handleChange} />

        <label>Total Amount Lost</label>
        <input type="text" name="totalAmountLost" value={formData.totalAmountLost} onChange={handleChange} />

        <button onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default Scsc;
