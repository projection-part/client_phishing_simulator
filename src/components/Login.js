import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await authService.login(formData);
            localStorage.setItem('token', token);
            navigate('/admin-dashboard', { replace: true });
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', () => {
                window.history.pushState(null, null, window.location.href);
            });
        } catch (err) {
            alert('Login failed');
        }
    };
    

    return (
        <Container maxWidth="sm">
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 5,
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Email"
                name="email"
                value={email}
                onChange={onChange}
                required
                type="email"
                fullWidth
            />
            <TextField
                label="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
                type="password"
                fullWidth
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                fullWidth
            >
                Login
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
                Don’t have an account?{' '}
                <Button component={Link} to="/" variant="text" color="primary">
                    Sign Up
                </Button>
            </Typography>
        </Box>
    </Container>
    );
};

export default Login;
