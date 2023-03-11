const Patients = require('../models/Patients');
const mongoose = require('mongoose');


/**
 * GET /
 * Homepage
 */

exports.homepage = async  (req, res) => {
    const locals = {
        title: 'JeffDev',
        description: 'Hello world'
    }
    res.render('index', locals );
}

/**
 * GET /
 * New patients form
 */

exports.addPatients = async (req, res) => {
    const locals = {
        title: 'Add new patient',
        description: 'I am a description'
    }
    res.render('patients/add', locals);
}

/**
 * POST /
 * Create new patient
 */

exports.postPatients = async (req, res) => {
    console.log(req.body);
    const newPatients = new Patients({
        firstName: req.body.firstName,
        DateOfBirth: req.body.DateOfBirth,
        Address: req.body.Address
    });
    try {
        await Patients.create(newPatients);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
    
}


