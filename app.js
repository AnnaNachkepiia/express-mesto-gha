const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorsType = require('./middlewares/errorsType');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(express.json());
app.use(helmet());
app.use(router);

app.use(errors());
app.use(errorsType);

app.listen(PORT, () => {});
