import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeForm({ onEmployeeAdded, editEmployee, onCancelEdit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    if (editEmployee) {
      setForm({
        name: editEmployee.name || '',
        email: editEmployee.email || '',
        position: editEmployee.position || '',
        department: editEmployee.department || '',
        salary: editEmployee.salary || ''
      });
    } else {
      setForm({ name: '', email: '', position: '', department: '', salary: '' });
    }
  }, [editEmployee]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editEmployee) {
        await axios.put(`http://localhost:5000/api/employees/${editEmployee._id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/employees', form);
      }
      setForm({ name: '', email: '', position: '', department: '', salary: '' });
      if (onEmployeeAdded) onEmployeeAdded();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      alert('Error saving employee. Check console.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={styles.input} />
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required disabled={!!editEmployee} style={styles.input} />
      <input name="position" placeholder="Position" value={form.position} onChange={handleChange} style={styles.input} />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} style={styles.input} />
      <input name="salary" placeholder="Salary" type="number" value={form.salary} onChange={handleChange} style={styles.input} />
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button type="submit" style={styles.button}>
          {editEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
        {editEmployee && (
          <button type="button" onClick={onCancelEdit} style={{ ...styles.button, backgroundColor: '#757575' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: 10,
    fontSize: '1rem',
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    padding: 12,
    fontSize: '1rem',
    borderRadius: 6,
    backgroundColor: '#1976d2',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};

export default EmployeeForm;
