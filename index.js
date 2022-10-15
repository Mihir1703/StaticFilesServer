const config = require('./config.json');
const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors')
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

    /* Defining routes in Routes.js */
    require('./routes/Routes')(app);

    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}

server().then(() => {
    console.log('Server started');
}).catch(err => {
    console.log(err);
});