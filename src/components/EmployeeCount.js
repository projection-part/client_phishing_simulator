import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const backend_url = process.env.REACT_APP_HOST_URL;
const EmployeeCount = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const fetchEmployeeCount = async () => {
        try {
            const response = await axios.get(`${backend_url}/admin-dashboard/employee-count`);
            setEmployeeCount(response.data.totalEmployees);
        } catch (error) {
            console.error('Error fetching employee count:', error);
        }
    };
    useEffect(() => {
        fetchEmployeeCount();
    }, []);

    // Bar Chart Data for Employee Counts
    const employeeCountData = {
        labels: ['Total Employees'],
        datasets: [
            {
                label: 'Employee Count',
                data: [employeeCount],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box mt={4}>
                <Typography variant="h6">Total Employees</Typography>
                <div style={{ width: '500px', height: '400px' }}>
                    <Bar data={employeeCountData} />
                </div>
            </Box>
        </Box>
    );
};

export default EmployeeCount;
