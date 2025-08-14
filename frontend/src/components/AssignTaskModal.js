// src/components/AssignTaskModal.js
import React, { useState } from 'react';
import axios from 'axios';

export default function AssignTaskModal({ employee, onClose, onTaskAssigned }) {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');

  if (!employee) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await axios.post(
        `http://localhost:5000/api/employees/${employee._id}/tasks`,
        { task }
      );
      setTask('');
      setStatus('Task assigned successfully!');
      if (onTaskAssigned) onTaskAssigned();
      setTimeout(onClose, 1000);
    } catch (err) {
      console.error(err);
      setStatus('Error assigning task');
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Assign Task to {employee.name}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <textarea
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Enter task description"
            rows={4}
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={modalStyles.assignButton}>Assign</button>
            <button type="button" onClick={onClose} style={modalStyles.cancelButton}>Cancel</button>
          </div>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  content: {
    backgroundColor: '#fff', borderRadius: 8, padding: 24,
    minWidth: 320, boxShadow: '0 0 12px #000'
  },
  assignButton: {
    backgroundColor: '#f9a825', color: '#fff', border: 'none',
    borderRadius: 6, padding: '10px 20px', cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#757575', color: '#fff', border: 'none',
    borderRadius: 6, padding: '10px 20px', cursor: 'pointer'
  }
};
