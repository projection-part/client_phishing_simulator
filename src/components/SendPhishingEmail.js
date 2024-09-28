import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const backend_url = process.env.REACT_APP_HOST_URL;
const SendPhishingEmail = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    axios.get(`${backend_url}/employees`)
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const sendEmail = async () => {
    if (!selectedEmployeeId) {
      setMessage('Please select an employee');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post(`${backend_url}/send-phishing-email/${selectedEmployeeId}`);
      setMessage('Phishing email sent successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error sending phishing email:', error);
      setMessage('Error sending phishing email.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Box
       sx={{
         display: 'flex', 
         flexDirection: 'column', 
         gap: 3, 
         width: '300px', 
         margin: '0 auto', 
         padding: '20px',
         border: '1px solid #ccc', 
         borderRadius: '8px',
         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
        }}>
      <h2>Send Phishing Email</h2>

      <FormControl fullWidth>
        <InputLabel id="select-employee-label">Select Employee</InputLabel>
        <Select
          labelId="select-employee-label"
          id="select-employee"
          value={selectedEmployeeId}
          label="Select Employee"
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
        >
          <MenuItem value="">
            <em>--Select Employee--</em>
          </MenuItem>
          {employees.map(employee => (
            <MenuItem key={employee._id} value={employee._id}>
              {employee.name} ({employee.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={sendEmail}>
        Send Phishing Email
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
    </div>
  );
};

export default SendPhishingEmail;
