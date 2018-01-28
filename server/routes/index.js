module.exports = function(app) {
    app.use('/adminsInfo', require('./adminsInfo.js'));
    app.use('/studentsInfo', require('./studentsInfo.js'));
    // app.use('/teachersInfo', require('./teachersInfo.js'));
    // app.use('/coursesInfo', require('./coursesInfo.js'));
};
