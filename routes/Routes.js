module.exports = (app) => {
    app.use('/api/auth', require('./Auth/Login'));
    app.use('/api/auth', require('./Auth/Register'));
    app.use('/api/auth', require('./Auth/Token'));
    app.use('/api/files', require('./Data/AddFiles'));
    app.use('/api/files', require('./Data/AddFiles'));
    app.use('/api/files', require('./Data/DeleteFiles'));
    app.use('/', require('./Data/ShowFiles'));
}