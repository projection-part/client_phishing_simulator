import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import SendPhishingEmail from './components/SendPhishingEmail';
import PhishingSimulation from './components/PhishingSimulation';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './components/NotFound';

const App = () => {
    const [reload, setReload] = React.useState(false);

  const fetchEmployees = () => {
    setReload(!reload); // Toggle reload to refresh employee list after adding
  };

    return (
        <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-employee"
            element={
              <div>
                <PrivateRoute>
                <AddEmployee fetchEmployees={fetchEmployees} />
                <EmployeeList key={reload} />
                </PrivateRoute>
              </div>
            }
          />
          <Route path="/send-phishing-email" element={
            <PrivateRoute>
              <SendPhishingEmail />
            </PrivateRoute>
            } />
          <Route path="/admin-dashboard" element={
                    <PrivateRoute>
                        <AdminDashboard />
                    </PrivateRoute>
          } />
          <Route path="/phishing-simulation" element={
            <PrivateRoute>
              <PhishingSimulation />
            </PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    );
};

export default App;
