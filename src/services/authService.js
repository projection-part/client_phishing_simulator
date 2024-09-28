import axios from 'axios';
const backend_url = process.env.REACT_APP_HOST_URL;
const API_URL = `${backend_url}/api/auth`;
const signup = async (userData) => {
    const res = await axios.post(`${API_URL}/signup`, userData);
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
    }
    return res.data;
};
const login = async (userData) => {
    const res = await axios.post(`${API_URL}/login`, userData);
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
    }
    return res.data.token;
};
const logout = () => {
    localStorage.removeItem('token');
};

const service = {signup, login, logout}
export default service;
