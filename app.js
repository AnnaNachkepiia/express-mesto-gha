const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const { login, createUser} = require("./controllers/users");

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {});

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "62f890bce9346ba0ccbc489d", // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });

app.post("/signin", login);
app.post("/", createUser);

app.use(auth);

app.use("/", usersRouter);
app.use("/", cardsRouter);
app.use("/*", (req, res) => {
  res.status(404).send({ message: "Произошла ошибка" });
});

app.listen(PORT, () => {});
