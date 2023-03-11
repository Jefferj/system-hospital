const express = require('express');
const router = express.Router
const patientsController = require('../controllers/patientsController');

router.get('/', patientsController.homepage);
router.get('/add', patientsController.addPatients);

module.exports = router;