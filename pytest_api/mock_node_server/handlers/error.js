module.exports = (err, req, res, next) => {
    return res.status(err.status).json({
        error : {
            message : err.message || 'Something not working!'
        }
    });
};