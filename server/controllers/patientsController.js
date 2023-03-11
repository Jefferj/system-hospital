


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
    


