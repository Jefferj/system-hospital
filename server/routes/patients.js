const express = require('express');
const router = express.Router
const patientsController = require('../controllers/patientsController');

router.get('/', patientsController.homepage);
router.get('/add', patientsController.addPatients);
router.post('/add', patientsController.postPatients);
router.get('/views/:id', patientsController.view);
router.get('/edit/:id', patientsController.edit);
router.put('/edit/:id', patientsController.editPost);
router.delete('/edit/:id', patientsController.deletePatients);
router.post('/search/:id', patientsController.searchPatients);

module.exports = router;