import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList({ onEdit, onView, onAssignTask }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/employees');
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  return (
    <>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>${employee.salary}</td>
                <td>
                  <button onClick={() => onView && onView(employee)} style={styles.viewButton}>
                    View
                  </button>{' '}
                  <button onClick={() => onEdit && onEdit(employee)} style={styles.editButton}>
                    Edit
                  </button>{' '}
                  <button onClick={() => handleDelete(employee._id)} style={styles.deleteButton}>
                    Delete
                  </button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  viewButton: {
    backgroundColor: '#0288d1',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '6px 10px',
    cursor: 'pointer',
    marginRight: 4,
    marginLeft: 110,
  },
  editButton: {
    backgroundColor: '#388e3c',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '6px 10px',
    cursor: 'pointer',
    marginRight: 4,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '6px 10px',
    cursor: 'pointer',
  },
};

export default EmployeeList;
