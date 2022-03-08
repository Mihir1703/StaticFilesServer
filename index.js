const config = require('./config.json');
const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors')
const User = require('./models/User');
const fileUpload = require('express-fileupload');

const server = async () => {
    await moongoose.connect(config.database.host, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to database');
    });

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(fileUpload());

    /* Authentication Routes */
    app.use('/auth', require('./routes/Auth/Login'));
    app.use('/auth', require('./routes/Auth/Token'));
    app.use('/auth', require('./routes/Auth/Register'));

    /* Data Routes */
    app.use('/api', require('./routes/Data/AddFiles'));
    app.use('/files', require('./routes/Data/ShowFiles'));

    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}

server().then(() => {
    console.log('Server started');
}).catch(err => {
    console.log(err);
});