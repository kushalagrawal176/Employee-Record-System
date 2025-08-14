import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeViewModal from './components/EmployeeViewModal';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch('http://localhost:5000/api/employees');
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEmployees();
  }, [refresh]);

  const triggerRefresh = () => {
    setRefresh(prev => !prev);
    setEditEmployee(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 30 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <h1>Employee Management Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{ margin:"20px", padding: '10px 20px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>

      <section style={{ marginBottom: 32 }}>
        <h2>{editEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
        <EmployeeForm
          editEmployee={editEmployee}
          onEmployeeAdded={triggerRefresh}
          onCancelEdit={() => setEditEmployee(null)}
        />
      </section>

      <section>
        <h2>Employee List</h2>
        <EmployeeList
        key={refresh}
        onEdit={setEditEmployee}
        onView={setViewEmployee}
        />
      </section>

      {viewEmployee && (
        <EmployeeViewModal employee={viewEmployee} onClose={() => setViewEmployee(null)} />
      )}

    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ background: '#003366', color: '#fff', padding: 12, textAlign: 'center', marginBottom: 32 }}>
        <Link to="/dashboard" style={{ color: '#fff', marginRight: 20 }}>Dashboard</Link>
        <Link to="/login" style={{ color: '#fff', marginRight: 20 }}>Login</Link>
        <Link to="/signup" style={{ color: '#fff' }}>Signup</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
