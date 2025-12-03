import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import authService from '../services/authService';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { username, email, password } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.signup(formData);
            navigate('/admin-dashboard', { replace: true });
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', () => {
                window.history.pushState(null, null, window.location.href);
            });
        } catch (err) {
            alert('Signup failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <h1 style={{textAlign:'center',fontFamily:'sans-serif',fontWeight:'bold'}}>Phishing attack Simulator</h1>
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
                    Sign Up
                </Typography>
                <TextField
                    label="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                    fullWidth
                />
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
                    
                    type="submit"
                    size="large"
                    fullWidth
                    sx={{ background: '#024A4A'}}
                >
                    Sign Up
                </Button>

                <Typography align="center" sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Button component={Link} to="/login" variant="text" sx={{ color: '#024A4A'}}>
                        Login
                    </Button>
                </Typography>
            </Box>
        </Container>
    );
};

export default Signup;
