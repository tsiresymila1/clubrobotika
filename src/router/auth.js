module.exports = function(req, res, next) {
    var engine = res.app.get('engine');
    var config = req.app.get('config');
    engine.env.addGlobal('request', req);
    // engine.addGlobal('config', config);
    // engine.addGlobal('request', req);
    if (req.session.auth || req.path === "/admin/login" || req.path === "/admin/student/edit" || req.path === '/') {
        next();
    } else {
        res.redirect('/admin/login');
    }
};