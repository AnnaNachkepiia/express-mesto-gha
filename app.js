const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "62f890bce9346ba0ccbc489d", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/", usersRouter);
app.use("/", cardsRouter);
// app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`App lissten on port ${PORT}`);
});
