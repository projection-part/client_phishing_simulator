import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const backend_url = process.env.REACT_APP_HOST_URL;
const ClickedPercentageChart = () => {
    const [clickedCount, setClickedCount] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);

    const fetchClickedPercentage = async () => {
        try {
            const response = await axios.get(`${backend_url}/admin-dashboard/clicked-percentage`);
            setClickedCount(response.data.clickedCount);
            setTotalEmployees(response.data.totalEmployees);
        } catch (error) {
            console.error('Error fetching clicked percentage:', error);
        }
    };

    useEffect(() => {
        fetchClickedPercentage();
    }, []);

    const notClickedCount = totalEmployees - clickedCount;
    
    const data = {
        labels: ['Clicked', 'Not Clicked'],
        datasets: [
            {
                label: 'Click Percentage',
                data: [clickedCount, notClickedCount],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        cutout: '50%', // This makes it a doughnut chart
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const percentage = ((context.raw / totalEmployees) * 100).toFixed(2);
                        return `${context.label}: ${percentage}% (${context.raw})`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '600px', height: '400px' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default ClickedPercentageChart;
