import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const backend_url = process.env.REACT_APP_HOST_URL;
const PhishingSimulation = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const employeeId = searchParams.get('employeeId');

  useEffect(() => {
    if (employeeId) {
      axios.patch(`${backend_url}/employee-clicked/${employeeId}`)
        .then(response => {
          setMessage('Thank you for participating in our security awareness program. This was a simulated phishing attempt to help you identify potential phishing threats. Always check the senders email, be cautious of urgent actions, and never click suspicious links. If in doubt, contact IT support.');
        })
        .catch(error => {
          console.error('Error updating click status:', error);
          setMessage('Error tracking the click.');
        });
    } else {
      setMessage('Invalid phishing link');
    }
  }, [employeeId]);

  return (
    <div>
      <h2>Security Awareness Program</h2>
      <p>{message}</p>
    </div>
  );
};

export default PhishingSimulation;
