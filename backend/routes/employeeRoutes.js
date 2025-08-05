const express = require('express');
const { createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();

router.post('/', createEmployee);         // Create
router.get('/', getEmployees);            // Read all
router.get('/:id', getEmployee);          // Read one
router.put('/:id', updateEmployee);       // Update
router.delete('/:id', deleteEmployee);    // Delete

module.exports = router;
