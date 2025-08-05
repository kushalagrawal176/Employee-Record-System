import React from 'react';

function EmployeeViewModal({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Employee Profile</h2>
        <p><b>Name:</b> {employee.name}</p>
        <p><b>Email:</b> {employee.email}</p>
        <p><b>Position:</b> {employee.position}</p>
        <p><b>Department:</b> {employee.department}</p>
        <p><b>Salary:</b> ${employee.salary}</p>
        <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    width: 320,
    boxShadow: '0 0 12px rgba(0,0,0,0.3)',
  },
  closeButton: {
    marginTop: 20,
    padding: '8px 16px',
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#1976d2',
    color: '#fff',
    cursor: 'pointer',
  }
};

export default EmployeeViewModal;
