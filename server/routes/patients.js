const express = require('express');
const router = express.Router
const patientsController = require('../controllers/patientsController');

router.get('/', patientsController.homepage);

module.exports = router;