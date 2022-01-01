module.exports = (req, res, next) => {
    console.log(`logger: ${req.method} ${req.path} unauthId: ${req.session.unauthId}`);
    next();
};