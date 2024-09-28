import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert, TextField, Box, Button } from '@mui/material';
const backend_url = process.env.REACT_APP_HOST_URL;
const AddEmployee = ({ fetchEmployees }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/add-employee`, { name, email });
      setSnackbarMessage(`Employee added: ${response.data.name}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setName('');
      setEmail('');
    } catch (error) {
      setSnackbarMessage('Error adding employee');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
<Box 
      component="form" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        width: '300px', 
        margin: '0 auto', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px' ,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
      }}
      onSubmit={handleSubmit}
    >
      <h2>Add New Employee</h2>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Employee
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddEmployee;
