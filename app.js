require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
// const cors = require('cors');
const errorsType = require('./middlewares/errorsType');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

// const options = {
//   origin: [
//     'https://localhost:3001',
//     'http://nachkepiia.student.nomorepartiesxyz.ru',
//     'https://nachkepiia.student.nomorepartiesxyz.ru',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
//   credentials: true,
// };
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});
// app.use(cors(options));

app.use(express.json());

app.use(helmet());
app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorsType);

app.listen(PORT, () => {});
