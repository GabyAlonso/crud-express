import {errorHandler} from "./middlewares/errorHandler";

const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(errorHandler);

Routes.configure(app);

const start = async () => {
    await mongoose.connect('mongodb://localhost/crud-express');

    app.listen(PORT, () => {
        console.log(`Express server listening on port ${PORT}`);
    });
};

start();

