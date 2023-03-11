


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