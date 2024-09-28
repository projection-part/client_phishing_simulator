import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import axios from 'axios';

const backend_url = process.env.REACT_APP_HOST_URL;
const TotalClickedChart = () => {
    const [clickedCount, setClickedCount] = useState(0);
    const fetchClickedCount = async () => {
        try {
            const response = await axios.get(`${backend_url}/admin-dashboard/total-clicked`);
            setClickedCount(response.data.clickedCount);
        } catch (error) {
            console.error('Error fetching clicked count:', error);
        }
    };

    useEffect(() => {
        fetchClickedCount();
    }, []);

    const data = [
        { name: 'Total Clicked', count: clickedCount }, // Data for chart
    ];

    return (
        <BarChart
            width={600}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
    );
};

export default TotalClickedChart;
