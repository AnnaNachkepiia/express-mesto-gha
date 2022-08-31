const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { errors, Joi, celebrate } = require("celebrate");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");
const { NotFound } = require("./errors/errorName");

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {});

app.use(express.json());
app.use(bodyParser.json());

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /https?:\/\/(www\.)?([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.use(auth);

app.use("/", usersRouter);
app.use("/", cardsRouter);
app.use("/*", (req, res, next) => {
  next(new NotFound("Страница не найдена"));
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: "На сервере произошла ошибка" });
  }
  next();
});

app.listen(PORT, () => {});
