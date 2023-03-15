const Patients = require('../models/Patients');
const mongoose = require('mongoose');


/**
 * GET /
 * Homepage
 */

exports.homepage = async  (req, res) => {
    const messages = await req.consumeFlash('info');
    const locals = {
        title: 'JeffDev',
        description: 'Hello world'
    }
    let perPage = 12;
    let page = req.query.page || 1;
    try {
        const patients = await Patients.aggregate([{$sort: {updateAt: 1} }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await Patients.count();

        res.render('index', {
            locals,
            patients,
            current: page,
            pages: Math.ceil(count / perPage),
            messages
        });

    } catch (error) {
        console.log(error);
    }
}

/*
exports.homepage = async  (req, res) => {
    const messages = await req.consumeFlash('info');
    const locals = {
        title: 'JeffDev',
        description: 'Hello world'
    }
    try {
        const patients = await Patients.find({}).limit(22);
        res.render('index', { locals, messages, patients} );
    } catch (error) {
        console.log(error);
    }
    res.render('index', {locals, messages} );
}
*/
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
        await req.flash('info', 'New patient has been added')
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET /
 * Patients Data
 */

exports.view = async (req, res) => {
    try {
        const patients = await Patients.findOne({ _id: req.params.id})
        const locals = {
            title: "View Patients Data",
            description: "nidvnbewnwinfw"
        };

        res.render('patients/view', {
            locals,
            patients
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET /
 * Edit Patients Data
 */

exports.edit = async (req, res) => {
    try {
        const patients = await Patients.findOne({ _id: req.params.id})
        const locals = {
            title: "Edit Patients Data",
            description: "nidvnbewnwinfw"
        };

        res.render('patients/edit', {
            locals,
            patients
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * PUT /
 * Update Patients Data
 */

exports.editPost = async (req, res) => {
    try {
        await Patients.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            DateOfBirth: req.body.DateOfBirth,
            Address: req.body.Address,
            updateAt: Date.now()
        });
        res.redirect(`/edit/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
}

/**
 * DELETE /
 * Delete Patients Data
 */

exports.deletePatients = async (req, res) => {
    try {
        await Patients.deleteOne({ _id: req.params.id});
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET /
 * Search Patients Data
 */

exports.searchPatients = async(req, res) => {
    const locals = {
        title: "Searhc Patients Data",
        description: "nidvnbewnwinfw"
    };
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
        const patients = await Patients.find({
            $or: [
                { firstName: { $regex: new RegExp(searchNoSpecialChar, "i")}},
                { DateOfBirth: { $regex: new RegExp(searchNoSpecialChar, "i")}},
            ]
        });
        res.render("search", {
            patients,
            locals
        })
    } catch (error) {
        console.log(error);
    }
}

